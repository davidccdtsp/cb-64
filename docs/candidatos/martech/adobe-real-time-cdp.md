---
id: adobe-real-time-cdp
nombre: Adobe Real-Time CDP
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 4, confianza: alta, fuentes: [ad-identity, ad-linking-rules] }
  MK-ID-02: { nota: 0, confianza: media, fuentes: [ad-rtcdp-identities] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [ad-identity] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [ad-multiregion] }
  MK-SEG-02: { nota: 4, confianza: media, fuentes: [ad-fac-overview] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [ad-rtcdp-product] }
  MK-ACT-03: { nota: 4, confianza: media, fuentes: [ad-fac-overview] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [ad-rtcdp-product] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [ad-rtcdp-product] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [ad-fac-arch] }
  MK-ARQ-02: { nota: 4, confianza: media, fuentes: [ad-fac-overview] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { nota: 4, confianza: alta, fuentes: [ad-consent] }
  MK-PRI-02: { nota: 4, confianza: alta, fuentes: [ad-privacy-service] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [ad-hosting, ad-multiregion] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 3, confianza: alta, fuentes: [ad-fac-ai] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [ad-hosting] }
  MK-DEP-02: { nota: 1, confianza: baja, fuentes: [ad-rtcdp-product] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [ad-hosting] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [ad-rtcdp-product] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [ad-fac-arch] }
  MK-COS-02: { nota: 1, confianza: baja, fuentes: [ad-rtcdp-product] }
---

# Adobe Real-Time CDP

## Resumen

Adobe Real-Time Customer Data Platform es la CDP de Adobe Experience Platform: Identity Service (grafo de identidad privado por organización), Real-Time Customer Profile, segmentación (streaming, por lotes y en el borde), destinos y gobernanza de datos[^ad-identity][^ad-rtcdp-product]. *Federated Audience Composition* añade audiencias sobre el warehouse sin copiar los datos[^ad-fac-overview]. El envío y la orquestación de journeys corresponden a Adobe Journey Optimizer (ficha aparte).

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
No se ha revisado el catálogo de fuentes/SDKs.

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado la captura server-side y first-party.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
Identity Service mantiene un grafo de identidad privado por organización, con espacios de nombres estándar y personalizados, reglas de vinculación y visor del grafo, actualizado en casi tiempo real.[^ad-identity][^ad-linking-rules]

### MK-ID-02 · Resolución probabilística / difusa · 0/5
La documentación indica que Real-Time CDP resuelve las identidades de forma determinista y no probabilística.[^ad-rtcdp-identities]

### MK-ID-03 · Perfil unificado y latencia · 4/5
El grafo se actualiza «casi en tiempo real» y alimenta el perfil de cliente en tiempo real; no se publica una latencia numérica.[^ad-identity]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Segmentación en streaming (con un límite global de referencia de 1,5 mil solicitudes por segundo por organización), además de segmentación por lotes y en el borde.[^ad-multiregion]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 4/5
Constructor de audiencias sin código y composición federada sobre tablas del warehouse sin copiar los datos subyacentes.[^ad-fac-overview]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha localizado un recuento oficial de destinos.

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Real-Time CDP activa hacia destinos; el envío de mensajes lo realizan Adobe Journey Optimizer u otras herramientas.[^ad-rtcdp-product]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Federated Audience Composition se conecta a Amazon Redshift, Azure Synapse, Databricks, Google BigQuery, Snowflake, Vertica y Microsoft Fabric.[^ad-fac-overview]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
Real-Time CDP no orquesta journeys; se hace en Adobe Journey Optimizer (ficha aparte).[^ad-rtcdp-product]

### MK-ORQ-02 · Experimentación · 0/5
Sin experimentación propia.[^ad-rtcdp-product]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/A
Real-Time CDP no envía email; lo hace Adobe Journey Optimizer / Campaign.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/A
Ídem.

### MK-EML-03 · IP dedicada y gestión de reputación · N/A
Ídem.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/A
Ídem.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 4/5
Patrón «zero copy» para audiencias: se enriquecen y activan directamente desde el warehouse junto a la ingesta tradicional; el perfil en tiempo real se mantiene en Experience Platform.[^ad-fac-arch]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Siete warehouses soportados (Snowflake, Databricks, BigQuery, Redshift, Synapse, Vertica, Fabric); no se ha verificado lectura de formatos abiertos.[^ad-fac-overview]

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado la exportación de datos.


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 4/5
Captura el consentimiento en el perfil de cada cliente y lo aplica junto con las políticas de uso de datos antes de activar audiencias hacia destinos.[^ad-consent]

### MK-PRI-02 · Supresión y derechos de los interesados · 4/5
Privacy Service ofrece API y UI para solicitudes de acceso y supresión en las aplicaciones de Experience Cloud, con retención y borrado automatizado de conjuntos de datos.[^ad-privacy-service]

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha revisado en fuente primaria el DPA y la lista de subencargados.

### MK-PRI-04 · Datos en la UE · Sí
Experience Platform está disponible en varios centros de datos y el cliente designa la región en la que residirán los datos; hay etiquetas de país (Alemania, Francia, Irlanda, Países Bajos).[^ad-hosting][^ad-multiregion]

### MK-PRI-05 · Certificaciones · N/D
No se han revisado las certificaciones.


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha revisado la IA predictiva (servicios inteligentes).

### MK-IA-02 · IA generativa de contenido · N/D
No se ha revisado en esta ficha; la generación de contenido corresponde a las aplicaciones de engagement.

### MK-IA-03 · Agentes y MCP · 3/5
AI Assistant crea composiciones de audiencia federada a partir de instrucciones en lenguaje natural, generando un plan que se ejecuta en el navegador tras su aprobación.[^ad-fac-ai]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS en centros de datos de Azure y AWS.[^ad-hosting]

### MK-DEP-02 · Esfuerzo de implantación y operación · 1/5
Producto empresarial con implantación por proyecto.[^ad-rtcdp-product]

### MK-DEP-03 · Autoalojable · No
Solo se ofrece como servicio en la nube de Adobe.[^ad-hosting]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado el ecosistema.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^ad-rtcdp-product]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario, con patrón «zero copy» hacia el warehouse.[^ad-fac-arch]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 1/5
Solo hay una descripción de producto; el precio es «contactar con ventas» y no se ha localizado una referencia pública citable.[^ad-rtcdp-product]


[^ad-identity]: Adobe Experience League, «Identity Service Overview», https://experienceleague.adobe.com/en/docs/experience-platform/identity/home, consultado 2026-09-30.
[^ad-linking-rules]: Adobe Experience League, «Identity Graph Linking Rules», https://experienceleague.adobe.com/en/docs/experience-platform/identity/features/identity-graph-linking-rules/overview, consultado 2026-09-30.
[^ad-rtcdp-identities]: Adobe Experience League, «Identities in Real-Time Customer Data Platform», https://experienceleague.adobe.com/en/docs/experience-platform/rtcdp/identity/identities-overview, consultado 2026-09-30.
[^ad-multiregion]: Adobe Experience League, «Adobe Experience Platform for multi-region, multi-brand enterprises», https://experienceleague.adobe.com/en/docs/experience-platform/landing/multi-region-multi-brand-whitepaper, consultado 2026-09-30.
[^ad-fac-overview]: Adobe Experience League, «Federated Audience Composition overview», https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/overview, consultado 2026-09-30.
[^ad-rtcdp-product]: Adobe, «Real-Time Customer Data Platform — Product Description», https://helpx.adobe.com/legal/product-descriptions/real-time-customer-data-platform.html, consultado 2026-09-30.
[^ad-fac-arch]: Adobe Experience League, «Federated Audience Composition High-level Architecture & Flow», https://experienceleague.adobe.com/en/docs/platform-learn/engage-with-audiences-from-your-data-warehouse-using-fac/fac-architecture-and-flow, consultado 2026-09-30.
[^ad-consent]: Adobe Experience League, «Consent Processing in Adobe Experience Platform», https://experienceleague.adobe.com/en/docs/experience-platform/landing/governance-privacy-security/consent/adobe/overview, consultado 2026-09-30.
[^ad-privacy-service]: Adobe Experience League, «Privacy Service Overview», https://experienceleague.adobe.com/en/docs/experience-platform/privacy/home, consultado 2026-09-30.
[^ad-hosting]: Adobe Trust Center, «Experience Cloud Hosting Locations», https://www.adobe.com/trust/experience-cloud-hosting-locations.html, consultado 2026-09-30.
[^ad-fac-ai]: Adobe Experience League, «AI Assistant Overview (Federated Audience Composition)», https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/start/ai-assistant, consultado 2026-09-30.
