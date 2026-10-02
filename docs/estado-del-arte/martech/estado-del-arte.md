# Estado del arte

La tecnología de marketing (Martech) aglutina una serie de disciplinas como pueden ser la recolción, gestión, análisis, diganósis descriptiva, predictiva y prescriptiva de datos para obtener conocimiento que aporte una ventaja competitiva en el ámbito del marketing. 

Se trata de un área de conocimiento multidisciplinar que abarca un amplio espectro de ramas científicas (economía, matemáticas, estadística, psicología, ciencia de datos, ingeniería de software...). A pesar de contar con una larga trayectoria, podría decirse que el marketing es tan antiguo como la historia del ser humano, es en las últimas décadas, con la implantación de las tecnologías de la información y la vasta disponibilidad de datos, cuando se integran nuevas tecnologías que producen una revolución en este campo.

## Evolución

### 1910 - 1920: Los inicios de la investigación comercial
Es durante los primeros años del siglo XX cuando se comienzan a emplear técnicas de marketing sobre los datos disponibles. Parlin para la Curtis Publishing Company inicia la recolección de información en mercados para guiar de un modo más eficiente en la creación de anuncios. Se comienza a generalizar la creación de departamentos de investigación comercial en las compañías; en 1919 Duncan enfatiza el uso de datos externos además de los internos. Durante la década de 1920 se populariza el uso de encuestas y su posterior análisis. Al mismo tiempo, se introducen en el marketing conceptos provenientes de la psicología, destacando el modelo AIDA (Atención, Interés, Deseo, Acción) de Starch en 1923, y se da el primer uso documentado de datos de seguimiento ocular (eye-tracking) en 1924. Es en esta época cuando se fundan las priemreras compañías de marketing (1923, A.C. Nielsen) centrada inicialmente en medir las ventas de productos en tiendas físicas[1].

### 1930 - 1950: El surgimiento de las métricas y los datos de panel
Posteriormente, en las décadas de 1930 y 1950, Nielsen comienza a evaluar las audiencias de radio y televisión. Durante esta época nacen también otras empresas clave como Burke en EE. UU. (1931) y GfK en Alemania (1934). En los años 40, los *paneles de datos*[2] ganan popularidad para registrar las compras de los consumidores, sumándose al auge de los experimentos de campo y las encuestas telefónicas[1].

### 1960 - 1970: Modelos analíticos y captura automatizada
El impulso de la Fundación Ford y Harvard en 1959/1960 y la creación del Marketing Science Institute [3] en 1961 promueven el desarrollo de modelos estadísticos y predictivos en marketing. En 1961, Cullinan introduce las métricas RFM (Recencia, Frecuencia, Valor Monetario), que sentarían las bases para la gestión de relaciones con clientes (CRM). Un gran punto de inflexión ocurre en 1972 con la introducción del Código Universal de Producto (UPC) [4] y los escáneres en los puntos de venta (POS) de IBM, marcando el inicio de la captura automatizada de datos de compra por parte de los minoristas. A finales de la década aparece el IRI (Information Resources, Inc.) que comienza a recolectar mediciones de la audiencia en los anuncios de television [1, 5].

### 1980 - 1990: La era del PC, el CRM y la World Wide Web
Prolifera el uso de bases de datos de clientes gracias a la popularización del ordenador personal (PC) por parte de IBM en 1981. Lo cual impulsa enormemente el marketing de bases de datos. Esto facilita que alrededor de 1990 surja el primer software de CRM. Posteriormente, la invención de la World Wide Web en 1995 da acceso a un volumen de datos masivo. Se comienzan a usar datos de flujo de clics (click-stream) y cookies para rastrear visitas, midiendo así la efectividad de la cada vez más habitual y rentable publicidad en medios digitales[1].

### 2000 - Presente: Big Data, Redes Sociales y Dispositivos Móviles
La fundación de Google en 1998 revoluciona el sector al registrar y utilizar datos de búsqueda de los usuarios. Esta información se pone a disposción de los usuarios, que ahora pueden utilizar una serie de herramientas analíticas que utilizar en su negocio. Con la llegada de Facebook (2004), YouTube (2005) y Twitter (2006), el contenido generado por el usuario (UGC) explota, proporcionando inmensas cantidades de datos no estructurados en forma de opiniones, textos y videos. Finalmente, en 2007, la llegada del iPhone de Apple con tecnología GPS marca el inicio de la captura masiva de datos de ubicación, permitiendo la personalización en tiempo real y abriendo paso definitivamente a la era analítica moderna del Big Data[1].

## B.1 Plataformas de datos de cliente, identidad, activación, privacidad e IA

### CDP: definición y tipos

El CDP Institute define una *Customer Data Platform* como «software que crea y mantiene un registro de cliente persistente y unificado, accesible a otros sistemas» [6]. Se distingue de un CRM (registro de relaciones comerciales) y de un DMP (audiencias anónimas y efímeras orientadas a publicidad) porque asume la responsabilidad de la identidad del cliente y de la estructura del registro, y ofrece un interfaz gobernado para que otros sistemas lo consuman. El mismo instituto clasifica las CDP por alcance funcional: *data* (captura, vinculación de identidades y almacenamiento), *analytics* (añade segmentación y modelos), *campaign* (añade tratamientos y orquestación) y *delivery* (ejecuta el envío por email, web, móvil o publicidad) [6].

Por arquitectura se distinguen dos familias:

- **Packaged / suite.** El proveedor aporta almacenamiento, resolución de identidad, segmentación y conectores en un único producto y mantiene una copia propia de los datos. Reduce el tiempo de implantación, pero duplica datos y genera dependencia del proveedor.
- **Composable / warehouse-native.** El perfil unificado reside en el data warehouse o lakehouse de la organización y la CDP se compone de módulos (ingesta, modelado, segmentación, activación) que operan sobre él sin copiar los datos a una base propietaria [7]. El CDP Institute contempla ya arquitecturas empaquetadas, centradas en el warehouse y mixtas [6].

**Reverse ETL** es el mecanismo de activación de la variante composable: sincroniza segmentos, atributos y métricas calculadas desde el warehouse hacia herramientas operacionales (email, CRM, publicidad), habitualmente de forma programada y, en algunos productos, casi en tiempo real [8]. Es la contrapartida del ETL/ELT clásico y convierte la analítica en *operational analytics*. Su límite es que, por sí solo, sincroniza datos pero no resuelve identidad ni decisiones en tiempo real, por lo que suele complementarse con ingesta por eventos [8, 9].

**Relación con el lakehouse (bloque A).** El *lakehouse* propone formatos abiertos de acceso directo (p. ej. Parquet), transacciones sobre el lago de datos y soporte de primera clase para machine learning, reduciendo la obsolescencia y el *lock-in* de los warehouses tradicionales [10]. Esa capa es el sustrato natural de una CDP composable: el lakehouse actúa como fuente única de verdad del cliente y la CDP aporta modelado de identidad, segmentación y activación encima, con ingesta por eventos y ETL cero cuando es posible [9, 11]. El informe *State of Martech 2026* recoge la misma tendencia: los proveedores composable evolucionan hacia capas de decisión «preparadas para contexto» que alimentan agentes de IA, aunque conviene leer esta afirmación con cautela, pues procede de un patrocinador que comercializa una CDP composable [12].

### Identidad: resolución, perfil unificado y tiempo real

La **resolución de identidad** vincula identificadores dispersos (cookies, dispositivos, email, teléfono, ID de CRM) con una misma persona. Se emplean dos aproximaciones complementarias:

- **Determinista:** coincidencia exacta sobre identificadores estables aportados por el usuario (email o ID tras login, teléfono). Alta precisión, cobertura limitada a usuarios autenticados.
- **Probabilística:** inferencia de que varios dispositivos pertenecen a la misma persona a partir de señales como red Wi-Fi compartida, geolocalización o comportamiento, construyendo «grafos de dispositivos». Mayor cobertura, con error asociado [13].

El trabajo de Li y Kannan formaliza el problema desde la medición: con datos individuales de contactos multicanal, la contribución de cada canal difiere de forma significativa de la que dan las métricas agregadas habituales, por lo que sin una identidad unificada la atribución queda sesgada [14]. Wedel y Kannan señalan igualmente que los entornos ricos en datos exigen integrar fuentes heterogéneas a nivel individual para apoyar decisiones [15]. En la práctica, el resultado es un **perfil unificado** que fusiona historial anónimo y conocido cuando el usuario se identifica, y que debe estar disponible con baja latencia para personalizar la interacción en curso. El *State of Martech 2026* muestra que la adopción es desigual: la resolución de identidad es un caso «bimodal», ya resuelto vía CDP/CRM o inexistente, y a menudo se percibe como responsabilidad de otras áreas (datos, TI) [12].

### Activación y *journeys*

La activación consiste en usar el perfil unificado para lanzar comunicaciones y experiencias en los canales. Los *journeys* orquestan secuencias de mensajes condicionadas a eventos y atributos del cliente. Davenport et al. sitúan esta evolución dentro de un marco de tres dimensiones (nivel de inteligencia, tipo de tarea y presencia de robots) y defienden que la IA será más eficaz si aumenta al equipo de marketing en lugar de sustituirlo [16].

**Email: deliverability y autenticación.** La entregabilidad depende de que el receptor pueda verificar quién envía:

- **SPF** (RFC 7208) declara en DNS qué servidores pueden enviar en nombre de un dominio [17].
- **DKIM** (RFC 6376) firma criptográficamente el mensaje, verificable con una clave pública publicada en DNS [18].
- **DMARC** (RFC 7489) permite al propietario del dominio indicar qué hacer si fallan SPF/DKIM alineados con el dominio de `From` (`none`, `quarantine`, `reject`) y recibir informes agregados [19]. Ashiq et al. midieron su ecosistema de informes: el uso de estos informes está muy concentrado en pocos terceros y una parte relevante de las configuraciones con destinos externos está mal configurada, lo que tiene implicaciones de seguridad [20].
- **BIMI** muestra el logotipo de la marca junto al mensaje autenticado. Exige política DMARC de cumplimiento (`quarantine` con `pct=100`, o `reject`) y, según el receptor, certificados de marca; sigue siendo un *Internet-Draft* del IETF y no un RFC [21].

**Requisitos actuales de los grandes proveedores de buzón** (envío masivo = unos 5.000 mensajes diarios o más a cuentas personales):

| Requisito | Google (Gmail) [22] | Yahoo [23] | Microsoft (Outlook.com) [24] |
|---|---|---|---|
| Vigente desde | Feb. 2024 | Feb. 2024 (aplicación gradual) | 5 may. 2025 |
| Todos los remitentes | SPF o DKIM, DNS directo e inverso válidos, TLS, RFC 5322 | SPF o DKIM, DNS directo e inverso, RFC 5321/5322 | — |
| Envío masivo | SPF **y** DKIM, DMARC publicado y alineado con SPF o DKIM | SPF **y** DKIM, DMARC con al menos `p=none` | SPF y DKIM, DMARC al menos `p=none` con alineación |
| Baja | Un clic (RFC 8058) [25] y enlace visible en el cuerpo | Cabeceras *list-unsubscribe* de un clic, baja en 2 días | — |
| Quejas de spam | Por debajo del 0,3 % (Postmaster Tools) | Por debajo del 0,3 % | — |

El incumplimiento implica limitación, envío a spam o rechazo SMTP. Cabe advertir que los umbrales y fechas de cada proveedor cambian; deben revisarse en la fuente oficial.

### Privacidad y consentimiento

- **RGPD** (Reglamento 2016/679): exige base jurídica para cada tratamiento, minimización, limitación de la finalidad y, cuando se usa el consentimiento, que sea libre, específico, informado e inequívoco [26, 27]. La elaboración de perfiles y las decisiones automatizadas tienen garantías adicionales (art. 22).
- **ePrivacy** (Directiva 2002/58/CE): el art. 5.3 exige consentimiento previo para almacenar o acceder a información en el terminal (cookies, SDK, píxeles) y el art. 13 lo exige para las comunicaciones comerciales electrónicas [28]. En España se transpone en la LSSI (art. 22.2 para cookies) y la AEPD publica una guía que exige que rechazar sea tan sencillo como aceptar [29].
- **Gestión del consentimiento:** las guías del EDPB establecen que los *cookie walls* y el simple desplazamiento por la página no constituyen consentimiento válido [30]. El TJUE exige además acción afirmativa: las casillas premarcadas no valen (*Planet49*, C-673/17) [31]. Una plataforma de gestión del consentimiento (CMP) debe registrar la prueba del consentimiento y propagarlo a la CDP para que segmentación y activación respeten cada preferencia.
- **Residencia del dato en la UE:** el RGPD no impone localización, pero sí condiciona las transferencias a terceros países (cap. V). La sentencia *Schrems II* (C-311/18) invalidó el Privacy Shield [32]; la Decisión de adecuación 2023/1795 (Marco de Privacidad de Datos UE-EE. UU.) [33] fue confirmada en primera instancia por el Tribunal General en *Latombe* (T-553/23, sept. 2025), con recurso pendiente ante el TJUE [34]. Por ello, alojar el lakehouse y la CDP en regiones UE es la opción de menor riesgo. Voigt y von dem Bussche ofrecen una guía práctica del marco [35].
- **Estado de la práctica:** en el *State of Martech 2026*, la gestión de privacidad y consentimiento, el cumplimiento de datos y el linaje forman el grupo de casos de uso con menor adopción (71 de 125 encuestados no usan IA en gestión de consentimiento), con el riesgo de que las carencias se propaguen a los agentes que consumen esos datos [12].

### Inteligencia artificial

- **Segmentación y modelos predictivos.** Kumar et al. describen cómo la IA permite ofrecer «engagement personalizado» mediante modelos predictivos (abandono, valor del cliente, siguiente mejor acción) [36]. Wedel y Kannan repasan los métodos analíticos (clasificación, series temporales, modelos bayesianos) que sustentan estas aplicaciones [15]. Con una CDP composable estos modelos se entrenan sobre el lakehouse y los resultados se escriben como atributos del perfil para su activación.
- **Generación de contenido.** Dwivedi et al. analizan las oportunidades y riesgos de la IA generativa conversacional (calidad, sesgos, veracidad, propiedad intelectual) [37]. El *State of Martech 2026* observa que las herramientas nativas de IA dominan la capa de creación, mientras que las plataformas consolidadas retienen la orquestación (puntuación de leads, entregabilidad) [12]. En la UE, el art. 50 del Reglamento de IA (2024/1689) impone transparencia: informar de que se interactúa con una IA, marcar los contenidos sintéticos y etiquetar los *deepfakes*; su aplicación estaba prevista para agosto de 2026, con un aplazamiento parcial en trámite [38, 39].
- **Agentes.** El informe de Brinker y Riemersma anticipa que el profesional de marketing pasará de crear campañas a gestionar agentes y flujos agénticos, y que su eficacia depende del contexto y la gobernanza de los datos a los que acceden [12]. Los casos agénticos (comunidad, redes sociales, asesores de compra) muestran todavía baja adopción por falta de responsabilidad clara ante errores [12]. La integración de agentes con el lakehouse para actuar sobre datos de cliente se describe en arquitecturas de referencia de los proveedores cloud [40].

## Referencias

- **[1]** **Wedel, M., & Kannan, P. K. (2016).** *"Marketing Analytics for Data-Rich Environments."*  Journal of Marketing. [https://journals.sagepub.com/doi/10.1509/jm.15.0413](https://journals.sagepub.com/doi/10.1509/jm.15.0413)
- **[2]** **Datos de panel** [https://es.wikipedia.org/wiki/Datos_de_panel](https://es.wikipedia.org/wiki/Datos_de_panel)
- **[3]** **Marketing Science Institute** [https://msi.org/](https://msi.org/)
- **[4]** **"The UPC"**, IBM [https://www.ibm.com/history/upc](https://www.ibm.com/history/upc)
- **[5]** **IRI** [https://en.wikipedia.org/wiki/IRI_(company)](https://en.wikipedia.org/wiki/IRI_(company))
- **[6]** **CDP Institute.** *"What is a CDP?"* [https://www.cdpinstitute.org/what-is-a-cdp/](https://www.cdpinstitute.org/what-is-a-cdp/)
- **[7]** **CDP.com.** *"Composable CDP: Definition, Architecture & How It Works."* [https://cdp.com/glossary/composable-cdp/](https://cdp.com/glossary/composable-cdp/)
- **[8]** **CDP.com.** *"Reverse ETL."* [https://cdp.com/glossary/reverse-etl/](https://cdp.com/glossary/reverse-etl/)
- **[9]** **AWS Partner Network Blog (2025).** *"Event-driven Composable CDP Architecture Powered by Snowplow and Databricks on AWS."* [https://aws.amazon.com/blogs/apn/event-driven-composable-cdp-architecture-powered-by-snowplow-and-databricks/](https://aws.amazon.com/blogs/apn/event-driven-composable-cdp-architecture-powered-by-snowplow-and-databricks/)
- **[10]** **Armbrust, M., Ghodsi, A., Xin, R., & Zaharia, M. (2021).** *"Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics."* CIDR 2021. [https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf](https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf)
- **[11]** **AWS.** *"Build Modern Data Applications with Lakehouse Architecture on AWS."* [https://builder.aws.com/content/37L0Ym3sf98S4H9tm5X5PGHlbnc/build-modern-data-applications-with-lakehouse-architecture-on-aws](https://builder.aws.com/content/37L0Ym3sf98S4H9tm5X5PGHlbnc/build-modern-data-applications-with-lakehouse-architecture-on-aws)
- **[12]** **Brinker, S., & Riemersma, F. (2026).** *"State of Martech 2026."* (documento local `extra/martech/state-of-martech-2026.pdf`) [https://chiefmartec.com/](https://chiefmartec.com/)
- **[13]** **Brookman, J., Rouge, P., Alva, A., & Yeung, C. (2017).** *"Cross-Device Tracking: Measurement and Disclosures."* PoPETs 2017(2). [https://petsymposium.org/popets/2017/popets-2017-0020.php](https://petsymposium.org/popets/2017/popets-2017-0020.php)
- **[14]** **Li, H., & Kannan, P. K. (2014).** *"Attributing Conversions in a Multichannel Online Marketing Environment: An Empirical Model and a Field Experiment."* Journal of Marketing Research. [https://doi.org/10.1509/jmr.13.0050](https://doi.org/10.1509/jmr.13.0050)
- **[15]** **Wedel, M., & Kannan, P. K. (2016).** Véase [1]. [https://journals.sagepub.com/doi/10.1509/jm.15.0413](https://journals.sagepub.com/doi/10.1509/jm.15.0413)
- **[16]** **Davenport, T., Guha, A., Grewal, D., & Bressgott, T. (2020).** *"How artificial intelligence will change the future of marketing."* Journal of the Academy of Marketing Science, 48, 24–42. [https://doi.org/10.1007/s11747-019-00696-0](https://doi.org/10.1007/s11747-019-00696-0)
- **[17]** **RFC 7208.** *"Sender Policy Framework (SPF)."* [https://www.rfc-editor.org/rfc/rfc7208](https://www.rfc-editor.org/rfc/rfc7208)
- **[18]** **RFC 6376.** *"DomainKeys Identified Mail (DKIM) Signatures."* [https://www.rfc-editor.org/rfc/rfc6376](https://www.rfc-editor.org/rfc/rfc6376)
- **[19]** **RFC 7489.** *"DMARC."* [https://www.rfc-editor.org/rfc/rfc7489](https://www.rfc-editor.org/rfc/rfc7489)
- **[20]** **Ashiq, M. I., Li, W., Fiebig, T., & Chung, T. (2023).** *"You've Got Report: Measurement and Security Implications of DMARC Reporting."* USENIX Security 2023. [https://www.usenix.org/system/files/usenixsecurity23-ashiq.pdf](https://www.usenix.org/system/files/usenixsecurity23-ashiq.pdf)
- **[21]** **IETF.** *"Brand Indicators for Message Identification (BIMI)"* (Internet-Draft). [https://datatracker.ietf.org/doc/draft-brand-indicators-for-message-identification/](https://datatracker.ietf.org/doc/draft-brand-indicators-for-message-identification/)
- **[22]** **Google.** *"Email sender guidelines."* [https://support.google.com/mail/answer/81126](https://support.google.com/mail/answer/81126)
- **[23]** **Yahoo.** *"Sender best practices."* [https://senders.yahooinc.com/best-practices/](https://senders.yahooinc.com/best-practices/)
- **[24]** **Microsoft (2025).** *"Strengthening Email Ecosystem: Outlook's New Requirements for High-Volume Senders."* [https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730)
- **[25]** **RFC 8058.** *"Signaling One-Click Functionality for List Email Headers."* [https://www.rfc-editor.org/rfc/rfc8058](https://www.rfc-editor.org/rfc/rfc8058)
- **[26]** **Reglamento (UE) 2016/679 (RGPD).** [https://eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- **[27]** **EDPB.** *"Guidelines 05/2020 on consent under Regulation 2016/679."* [https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en)
- **[28]** **Directiva 2002/58/CE (ePrivacy).** [https://eur-lex.europa.eu/eli/dir/2002/58/oj](https://eur-lex.europa.eu/eli/dir/2002/58/oj)
- **[29]** **AEPD.** *"Guía sobre el uso de las cookies."* [https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-aepd-presenta-junto-la-industria-una-guia-sobre-el-uso-de](https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-aepd-presenta-junto-la-industria-una-guia-sobre-el-uso-de)
- **[30]** **Cleary Gottlieb (2020).** *"Cookie Walls and Scrolling Don't Make the Grade – EDPB Clarifies Guidance on Consent Under GDPR."* [https://www.clearycyberwatch.com/2020/05/cookie-walls-and-scrolling-dont-make-the-grade-edpb-clarifies-guidance-on-consent-under-gdpr/](https://www.clearycyberwatch.com/2020/05/cookie-walls-and-scrolling-dont-make-the-grade-edpb-clarifies-guidance-on-consent-under-gdpr/)
- **[31]** **TJUE.** *Planet49*, C-673/17. [https://curia.europa.eu/juris/liste.jsf?num=C-673/17](https://curia.europa.eu/juris/liste.jsf?num=C-673/17)
- **[32]** **TJUE.** *Schrems II*, C-311/18. [https://curia.europa.eu/juris/liste.jsf?num=C-311/18](https://curia.europa.eu/juris/liste.jsf?num=C-311/18)
- **[33]** **Comisión Europea.** Decisión de Ejecución (UE) 2023/1795 (Marco de Privacidad de Datos UE-EE. UU.). [https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj)
- **[34]** **Tribunal General de la UE (2025).** Nota de prensa sobre *Latombe/Comisión*, T-553/23. [https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf](https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf)
- **[35]** **Voigt, P., & von dem Bussche, A. (2017).** *"The EU General Data Protection Regulation (GDPR): A Practical Guide."* Springer. [https://link.springer.com/book/10.1007/978-3-319-57959-7](https://link.springer.com/book/10.1007/978-3-319-57959-7)
- **[36]** **Kumar, V., Rajan, B., Venkatesan, R., & Lecinski, J. (2019).** *"Understanding the Role of Artificial Intelligence in Personalized Engagement Marketing."* California Management Review. [https://journals.sagepub.com/doi/10.1177/0008125619859317](https://journals.sagepub.com/doi/10.1177/0008125619859317)
- **[37]** **Dwivedi, Y. K. et al. (2023).** *"'So what if ChatGPT wrote it?' Multidisciplinary perspectives on opportunities, challenges and implications of generative conversational AI for research, practice and policy."* Int. Journal of Information Management, 71, 102642. [https://www.sciencedirect.com/science/article/pii/S0268401223000233](https://www.sciencedirect.com/science/article/pii/S0268401223000233)
- **[38]** **Reglamento (UE) 2024/1689 (AI Act), art. 50.** [https://artificialintelligenceact.eu/article/50/](https://artificialintelligenceact.eu/article/50/)
- **[39]** **Comisión Europea.** *"Guidelines on transparency obligations for providers and deployers of certain AI systems."* [https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content](https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content)
- **[40]** **AWS Big Data Blog (2026).** *"Multi-cloud lakehouse architecture on AWS for Agentic AI."* [https://aws.amazon.com/blogs/big-data/multi-cloud-lakehouse-architecture-on-aws-for-agentic-ai-part-1-architecture-and-best-practices/](https://aws.amazon.com/blogs/big-data/multi-cloud-lakehouse-architecture-on-aws-for-agentic-ai-part-1-architecture-and-best-practices/)
