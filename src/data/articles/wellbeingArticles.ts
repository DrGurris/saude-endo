import type { WebArticle } from '../../types'

export const WELLBEING_ARTICLES: WebArticle[] = [
  {
    id: 'wellbeing-mindfulness',
    pillarId: 'wellbeing',
    title: 'Mindfulness para el Dolor Crónico',
    summary: 'Técnicas de atención plena que ayudan a manejar el dolor y el estrés.',
    contentMarkdown: `# Mindfulness para el Dolor Crónico

La meditación mindfulness ha pasado de ser una práctica espiritual a convertirse en una herramienta terapéutica con sólido respaldo científico para el manejo del dolor crónico. En el contexto de la endometriosis, estudios han demostrado que el mindfulness reduce significativamente la catastrofización del dolor (la tendencia a magnificar y rumiar sobre el dolor), mejora la calidad de vida y puede reducir la necesidad de analgésicos.

No se trata de ignorar el dolor ni de "pensar positivo". El mindfulness te enseña a cambiar tu relación con el dolor — a observarlo sin ser dominada por él.

## ¿Cómo funciona el mindfulness en el dolor?

La neurociencia moderna ha revelado que la experiencia del dolor tiene dos componentes:

1. **El componente sensorial:** la señal física pura (intensidad, ubicación, tipo de sensación)
2. **El componente afectivo-cognitivo:** la reacción emocional y mental al dolor (miedo, frustración, catastrofización, anticipación)

El mindfulness actúa principalmente sobre el segundo componente. Cuando reaccionas al dolor con miedo ("¿y si empeora?"), frustración ("¿por qué a mí?") o catastrofización ("nunca voy a mejorar"), tu cerebro amplifica la señal de dolor. Esto no es imaginario — los estudios de neuroimagen muestran que la catastrofización activa las mismas regiones cerebrales que el dolor intenso.

Al practicar mindfulness, aprendes a:
- **Observar las sensaciones sin juzgarlas** — "hay una sensación de presión en mi pelvis" en lugar de "este dolor horrible me está arruinando la vida"
- **Reducir la reactividad emocional** — permitir que las emociones estén presentes sin que controlen tus acciones
- **Separar la sensación física del sufrimiento mental** — el dolor es inevitable en endometriosis, pero el sufrimiento añadido puede reducirse
- **Desarrollar una respuesta de relajación** — el mindfulness activa el sistema nervioso parasimpático, contrarrestando la respuesta de estrés que amplifica el dolor

## Técnicas principales adaptadas para endometriosis

### 1. Body scan (escaneo corporal)

Una de las técnicas más efectivas para dolor crónico. Consiste en llevar la atención de forma progresiva a cada parte del cuerpo, desde los pies hasta la cabeza, observando las sensaciones que encuentras sin intentar cambiarlas.

**Práctica:** acuéstate cómodamente con una almohada bajo las rodillas si hay dolor lumbar. Cierra los ojos. Comienza por los dedos de los pies — nota cualquier sensación (calor, hormigueo, presión, nada). Sin juzgar, avanza hacia los pies, tobillos, pantorrillas, rodillas... Cuando llegues a la pelvis, observa las sensaciones con especial curiosidad pero sin tensión adicional. "¿Qué hay aquí realmente?" Continúa hasta la coronilla. **Duración:** 15-25 minutos. Versiones guiadas disponibles en apps como Insight Timer, Calm o Headspace.

### 2. Respiración consciente 4-7-8

Técnica que activa directamente el nervio vago y el sistema parasimpático, reduciendo la respuesta de estrés.

**Técnica:** inhala por la nariz contando hasta 4, retén el aire contando hasta 7, exhala lentamente por la boca contando hasta 8. Repite 4-8 ciclos. La exhalación prolongada es la clave — activa la relajación fisiológica de forma inmediata.

**Cuándo usarla:** durante crisis de dolor, antes de dormir, cuando sientas ansiedad anticipatoria, antes de una cita médica que te genere estrés.

### 3. Meditación de aceptación radical

La aceptación no es resignación — es dejar de pelear contra lo que ya está presente para poder actuar con mayor claridad.

**Práctica:** siéntate cómodamente y toma consciencia de tu cuerpo. Si hay dolor, dirige tu atención hacia él con curiosidad en lugar de aversión. Observa sus cualidades: ¿es punzante, sordo, caliente, frío? ¿Tiene bordes definidos o es difuso? ¿Cambia momento a momento? Repite internamente: "El dolor está aquí. Puedo estar con él en este momento." No estás aceptando que siempre será así — estás aceptando que está aquí ahora, y eso está bien. **Duración:** 10-15 minutos.

### 4. Movimiento consciente (mindful movement)

Combinar movimiento suave con atención plena multiplica los beneficios de ambas prácticas.

- **Yoga mindful:** posturas suaves de Hatha o Yin yoga realizadas con atención completa en las sensaciones, no en lograr la postura "perfecta"
- **Caminata consciente:** caminar lentamente prestando atención a cada paso — la sensación del pie en el suelo, el movimiento de las piernas, la brisa en la piel
- **Tai Chi:** movimientos fluidos y lentos que combinan meditación, respiración y movimiento. Evidencia creciente para dolor crónico

## Cómo establecer una práctica sostenible

La consistencia importa mucho más que la duración. Una práctica diaria de 10 minutos produce más beneficios que una sesión semanal de una hora.

- **Comienza con 5-10 minutos diarios** — es suficiente para establecer el hábito
- **Mismo horario cada día** — al despertar o antes de dormir suelen funcionar mejor
- **Usa meditaciones guiadas inicialmente** — es más fácil mantener la atención
- **No juzgues tu práctica** — la mente se distrae, eso es normal. Cada vez que la traes de vuelta estás fortaleciendo la atención
- **Sé paciente:** los beneficios neurológicos son acumulativos. Los estudios muestran cambios significativos después de 8 semanas de práctica regular
- **Mantén un registro breve** — anotar 1-2 líneas después de cada sesión (duración, técnica, cómo te sentiste) te ayuda a ver progreso con el tiempo

## Evidencia científica

- Programas de 8 semanas de Mindfulness-Based Stress Reduction (MBSR) reducen la intensidad del dolor en un 30-40% y la catastrofización en un 50% en pacientes con dolor crónico
- Estudios de neuroimagen muestran que la meditación regular modifica la estructura de la corteza cingulada anterior y la ínsula — regiones cerebrales clave en el procesamiento del dolor
- En endometriosis específicamente, las intervenciones de mindfulness mejoran la calidad de vida, reducen la ansiedad y mejoran la función sexual`,
    citations: [
      'Ball et al. (2020) J Psychosom Res, 134:110133',
      'Kabat-Zinn (2003) Clin Psychol Sci Pract, 10(2):144-156',
      'Zeidan et al. (2012) J Neurosci, 32(14):5024-5033',
    ],
    phenotypeRelevance: ['nociplastic', 'neuropathic', 'mixed'],
    goalRelevance: ['general_wellbeing', 'reduce_pain'],
    readTimeMinutes: 6,
    tags: ['mindfulness', 'meditación', 'dolor crónico'],
  },
  {
    id: 'wellbeing-emotional',
    pillarId: 'wellbeing',
    title: 'Manejo del Estrés y la Ansiedad',
    summary: 'Estrategias para cuidar tu salud mental mientras vives con endometriosis.',
    contentMarkdown: `# Manejo del Estrés y la Ansiedad

Vivir con una condición crónica como la endometriosis tiene un impacto emocional profundo que va mucho más allá del dolor físico. Los estudios muestran que las pacientes con endometriosis tienen tasas significativamente más altas de ansiedad (39-70%) y depresión (23-47%) comparadas con la población general. Estos no son signos de debilidad — son respuestas comprensibles a una enfermedad que es dolorosa, impredecible, frecuentemente invalidada y que afecta múltiples aspectos de la vida.

Reconocer y abordar el impacto emocional no es un "extra" del tratamiento — es parte fundamental del manejo integral.

## El impacto emocional: por qué es tan profundo

La endometriosis afecta la salud mental a través de múltiples vías:

- **Dolor crónico e impredecible:** no saber cuándo vendrá el próximo episodio de dolor genera hipervigilancia y ansiedad anticipatoria. Tu sistema nervioso se mantiene en estado de alerta constante
- **Ansiedad sobre el futuro y la fertilidad:** la incertidumbre sobre si podrás tener hijos, sobre la progresión de la enfermedad, sobre si el tratamiento actual seguirá funcionando
- **Sentimientos de aislamiento e incomprensión:** "pero si te ves bien", "todas las mujeres tienen cólicos", "seguro no es para tanto". La invalidación repetida causa un daño emocional profundo
- **Impacto en la identidad:** la endometriosis puede alterar cómo te ves a ti misma en relación con tu carrera, tu feminidad, tu sexualidad y tus relaciones
- **Duelo por la vida que esperabas tener:** planes cancelados, carreras afectadas, relaciones impactadas, espontaneidad perdida
- **Estrés por la imprevisibilidad:** no poder planificar con certeza genera una sensación de falta de control que alimenta la ansiedad
- **Impacto en las relaciones y la sexualidad:** la dispareunia, la fatiga y los cambios de humor pueden tensionar las relaciones de pareja

## Estrategias de manejo basadas en evidencia

### Mindfulness y meditación
La meditación regular ha demostrado reducir la ansiedad, la catastrofización del dolor y mejorar la calidad de vida en pacientes con dolor crónico. No necesitas sesiones largas: 10 minutos diarios de respiración consciente o body scan producen beneficios medibles en 4-8 semanas.

### Journaling (escritura terapéutica)
Escribir sobre tus experiencias, emociones y pensamientos durante 15-20 minutos, 3-4 veces por semana, tiene beneficios documentados:
- Reduce la rumiación (dar vueltas mentales al mismo pensamiento)
- Ayuda a procesar emociones difíciles externalizándolas
- Permite identificar patrones entre estrés, estado emocional y síntomas
- Puede reducir la frecuencia de visitas médicas por síntomas

**Técnica:** escribe sin censura, sin preocuparte por gramática o estructura. Puedes escribir sobre lo que sientes, lo que te frustra, lo que agradeces, o simplemente narrar tu día. Si el dolor es intenso, escribe sobre él — la externalización puede reducir su peso emocional.

### Comunidad de apoyo
El aislamiento amplifica el sufrimiento. Conectar con otras personas que entienden tu experiencia proporciona:
- **Validación:** saber que no estás sola y que lo que sientes es normal
- **Estrategias prácticas:** aprender trucos y recursos de otras pacientes con experiencia
- **Normalización:** ver que otras mujeres exitosas también luchan con los mismos desafíos
- **Esperanza:** conocer historias de mujeres que han encontrado manejo efectivo

Opciones: grupos de apoyo presenciales o virtuales, comunidades en línea moderadas, eventos de asociaciones de endometriosis.

### Terapia profesional
Un psicólogo especializado en enfermedades crónicas o dolor crónico puede proporcionar herramientas que son difíciles de desarrollar por cuenta propia:
- **Terapia Cognitivo-Conductual (TCC):** reestructurar pensamientos negativos automáticos sobre la enfermedad
- **Terapia de Aceptación y Compromiso (ACT):** aprender a vivir una vida significativa con el dolor presente
- **EMDR:** para trauma médico (diagnósticos tardíos, experiencias quirúrgicas difíciles, invalidación)
- **Terapia de pareja:** cuando la endometriosis impacta la relación

## Técnicas de regulación emocional rápida

Para momentos de ansiedad aguda o crisis emocional:

1. **Respiración 4-7-8:** inhala 4 segundos, mantén 7, exhala 8. Repite 4-8 ciclos. Activa directamente el sistema nervioso parasimpático
2. **Grounding 5-4-3-2-1:** nombra 5 cosas que ves, 4 que puedes tocar, 3 que escuchas, 2 que hueles, 1 que saboreas. Ancla tu atención al presente, sacándote de la espiral mental
3. **Temperatura fría:** sostén un cubo de hielo o sumerge las manos en agua fría. La sensación intensa interrumpe el circuito de ansiedad (técnica de terapia dialéctico-conductual)
4. **Movimiento físico:** incluso 5 minutos de caminata, estiramientos o saltar suavemente puede descargar la energía ansiosa
5. **Auto-compasión dirigida:** coloca una mano en tu pecho y repite: "Esto es un momento de sufrimiento. El sufrimiento es parte de la experiencia humana. Puedo tratarme con amabilidad en este momento."

## Señales de que necesitas ayuda profesional

- Sentimientos persistentes de tristeza o desesperanza que duran más de 2 semanas
- Pérdida de interés en actividades que antes disfrutabas
- Cambios significativos en el sueño o el apetito no explicados por el dolor
- Aislamiento social progresivo
- Pensamientos de hacerte daño o de que las cosas no tienen sentido
- Uso de alcohol o sustancias para manejar el dolor emocional

**Recuerda:** pedir ayuda no es debilidad — es un acto de valentía y autocuidado. No estás sola en esto.`,
    citations: [
      'Hansen et al. (2023) Pain Med, 24(2):123-135',
      'Laganà et al. (2017) Arch Womens Ment Health, 20(2):249-257',
      'Facchin et al. (2021) J Affect Disord, 295:359-367',
    ],
    phenotypeRelevance: ['nociplastic', 'neuropathic', 'nociceptive', 'mixed'],
    goalRelevance: ['general_wellbeing', 'improve_energy', 'control_belly', 'improve_fertility'],
    readTimeMinutes: 6,
    tags: ['salud mental', 'estrés', 'ansiedad'],
    featured: true,
  },
  {
    id: 'wellbeing-cbt-act',
    pillarId: 'wellbeing',
    title: 'Terapia Cognitivo-Conductual (TCC)',
    summary: 'Cómo la TCC puede ayudar con el dolor crónico y el impacto emocional.',
    contentMarkdown: `# Terapia Cognitivo-Conductual (TCC) y ACT

La Terapia Cognitivo-Conductual (TCC) es la intervención psicológica con mayor respaldo científico para el manejo del dolor crónico y sus consecuencias emocionales. En el contexto de la endometriosis, la TCC no pretende que el dolor desaparezca, sino que te proporciona herramientas para que el dolor tenga menos poder sobre tu vida, tus decisiones y tu bienestar emocional.

Junto con la TCC, la Terapia de Aceptación y Compromiso (ACT, pronunciada como una sola palabra) representa un enfoque complementario que ha ganado creciente evidencia en dolor crónico ginecológico.

## Principios fundamentales de la TCC

La TCC se basa en una idea poderosa: no son los eventos los que causan nuestras emociones, sino la interpretación que hacemos de ellos. En el dolor crónico, ciertos patrones de pensamiento amplifican el sufrimiento:

### Pensamientos automáticos negativos comunes en endometriosis
- **Catastrofización:** "Este dolor va a empeorar hasta ser insoportable" / "Nunca voy a mejorar"
- **Generalización excesiva:** "Todo me sale mal por culpa de esta enfermedad"
- **Pensamiento todo-o-nada:** "Si no puedo hacer ejercicio intenso, no tiene sentido hacer nada"
- **Lectura de mente:** "Mis compañeros de trabajo piensan que exagero"
- **Profecía autocumplida:** "Seguro mañana voy a tener dolor, mejor cancelo todo" → aislamiento → más dolor

### El ciclo TCC del dolor crónico
Situación (dolor pélvico) → Pensamiento ("nunca voy a mejorar") → Emoción (desesperanza, miedo) → Conducta (aislamiento, inactividad, dejar de intentar) → Más dolor y más sufrimiento → Se refuerza el pensamiento negativo

La TCC te enseña a intervenir en cada punto de este ciclo:

1. **Identificar** los pensamientos automáticos negativos — el primer paso es notar que están ahí. La mayoría son tan habituales que no los cuestionamos
2. **Evaluar su veracidad** — ¿hay evidencia real de que "nunca" mejorarás? ¿Has tenido días mejores? ¿Has encontrado estrategias que ayudan?
3. **Generar pensamientos alternativos más equilibrados** — no "pensar positivo" artificialmente, sino pensar de forma más precisa: "Hoy el dolor es fuerte, pero he tenido días mejores y tengo herramientas para manejarlo"
4. **Modificar conductas** que mantienen el ciclo — reactivación conductual gradual, retomar actividades significativas paso a paso

## ACT: Terapia de Aceptación y Compromiso

Mientras la TCC busca cambiar los pensamientos, ACT propone cambiar nuestra relación con ellos. No es mejor ni peor que la TCC — son enfoques complementarios que funcionan para diferentes aspectos del sufrimiento.

### Los 6 pilares de ACT

**1. Aceptación**
Reconocer que el dolor es parte de tu experiencia actual, sin luchar contra esa realidad. La lucha contra el dolor (tensión muscular, evitación, resistencia mental) frecuentemente genera más sufrimiento que el dolor mismo. Aceptar no es resignarse — es dejar de gastar energía en una batalla improductiva para poder invertirla en vivir.

**2. Defusión cognitiva**
Crear distancia entre tú y tus pensamientos. En lugar de "soy una persona enferma", practicar "estoy teniendo el pensamiento de que soy una persona enferma". Esto reduce el poder de los pensamientos negativos automáticos.

**3. Contacto con el momento presente**
Similar al mindfulness — estar aquí y ahora en lugar de perderse en preocupaciones sobre el futuro o rumiaciones sobre el pasado.

**4. Yo como contexto**
Reconocer que tú eres más que tu dolor, más que tus pensamientos, más que tu enfermedad. Eres el espacio en el que todas esas experiencias ocurren, pero no te definen.

**5. Valores**
Clarificar qué es verdaderamente importante para ti — más allá del dolor. ¿Qué tipo de persona quieres ser? ¿Qué relaciones valoras? ¿Qué actividades dan significado a tu vida?

**6. Acción comprometida**
Dar pasos concretos hacia tus valores, incluso con dolor presente. No esperar a que el dolor desaparezca para empezar a vivir. Pequeñas acciones alineadas con tus valores construyen una vida significativa.

## Técnicas prácticas que puedes usar hoy

### 1. Registro de pensamientos (TCC)
Cuando notes un cambio emocional intenso:
- **Situación:** ¿qué pasó? (dolor intenso en reunión de trabajo)
- **Pensamiento automático:** ¿qué pensaste? ("no puedo más, voy a tener que dejar de trabajar")
- **Emoción:** ¿qué sentiste? (desesperanza 8/10, miedo 7/10)
- **Evidencia a favor:** ¿hay datos que apoyen ese pensamiento?
- **Evidencia en contra:** ¿hay datos que lo contradigan? (he tenido días así antes y los he manejado)
- **Pensamiento alternativo:** "Este es un momento difícil, pero tengo estrategias. Puedo pedir un descanso de 10 minutos."
- **Emoción después:** (desesperanza 4/10, sensación de control 6/10)

### 2. Exposición gradual (TCC)
Si has evitado actividades por miedo al dolor, la exposición gradual te ayuda a recuperarlas:
- Lista las actividades evitadas de menor a mayor dificultad
- Comienza por la más fácil y practícala repetidamente hasta que la ansiedad disminuya
- Avanza a la siguiente cuando te sientas cómoda

### 3. Ejercicio de valores (ACT)
Completa: "Si el dolor no limitara mi vida, yo dedicaría mi tiempo a..." Las respuestas revelan tus valores. Ahora pregunta: "¿Qué pequeño paso puedo dar HOY hacia eso, incluso con dolor?"

## Acceso a terapia

- Buscar terapeutas certificados en TCC o ACT con experiencia en dolor crónico
- Preguntar específicamente por experiencia con endometriosis o enfermedades ginecológicas
- La terapia online es una opción accesible y efectiva, especialmente para días de dolor
- Libros de autoayuda basados en ACT (como "Vivir con plenitud a pesar del dolor" de McCracken) pueden complementar la terapia
- Programas grupales de TCC para dolor crónico pueden ser más accesibles económicamente`,
    citations: [
      'Hansen et al. (2023) Pain Med, 24(2):123-135',
      'Veehof et al. (2016) Pain, 157(11):2589-2600',
      'Williams et al. (2012) Cochrane Database Syst Rev, 11:CD007407',
    ],
    phenotypeRelevance: ['nociplastic', 'neuropathic', 'mixed'],
    goalRelevance: ['general_wellbeing', 'reduce_pain'],
    readTimeMinutes: 6,
    tags: ['TCC', 'terapia', 'psicología'],
  },
  {
    id: 'wellbeing-support-network',
    pillarId: 'wellbeing',
    title: 'Red de Apoyo Emocional',
    summary: 'La importancia del apoyo social en el manejo de la endometriosis.',
    contentMarkdown: `# Red de Apoyo Emocional

La endometriosis no solo afecta tu cuerpo — impacta tus relaciones, tu vida social, tu identidad profesional y tu salud mental. Construir una red de apoyo sólida no es un "complemento agradable" al tratamiento médico — la investigación demuestra consistentemente que el apoyo social es un factor protector independiente contra la depresión, la percepción de dolor y la discapacidad funcional en enfermedades crónicas.

Las pacientes con endometriosis que tienen redes de apoyo funcionales reportan sistemáticamente mejor calidad de vida, incluso cuando la severidad de su enfermedad es comparable a la de pacientes más aisladas.

## ¿Por qué el apoyo social importa tanto en endometriosis?

El impacto del apoyo social va mucho más allá del bienestar emocional:

- **Modulación del dolor:** las personas con vínculos sociales fuertes muestran menor activación de las regiones cerebrales asociadas al dolor. El cerebro social y el cerebro del dolor comparten circuitos — la conexión humana literalmente reduce la señal de dolor
- **Adherencia al tratamiento:** tener a alguien que te acompañe, recuerde tus medicamentos o te anime a mantener hábitos saludables mejora significativamente el cumplimiento terapéutico
- **Buffer contra el estrés:** el apoyo social amortigua el impacto del estrés crónico sobre el sistema inmune y el eje HPA, reduciendo la inflamación sistémica
- **Menos síntomas depresivos:** el aislamiento es tanto un síntoma como un mantenedor de la depresión. Romper ese ciclo es terapéutico
- **Sentido de pertenencia:** saber que no estás sola en tu experiencia normaliza tus emociones y reduce la sensación de ser "diferente" o "defectuosa"

## Construyendo tu red de apoyo: estrategias prácticas

### 1. Comunicación con pareja y familia

La endometriosis frecuentemente tensiona las relaciones más cercanas, no por falta de cariño sino por falta de comprensión. Tu dolor es invisible, y quienes te rodean pueden sentirse frustrados, impotentes o incluso escépticos.

**Estrategias concretas:**
- **Explica tu condición con información clara:** comparte artículos como este, infografías o videos educativos. No esperes que entiendan por intuición una enfermedad que confunde incluso a muchos médicos
- **Sé específica sobre tus necesidades:** "necesito que me ayudes con las tareas de la casa los primeros 2 días de mi período" es más efectivo que "necesito que me entiendas"
- **Invítalos a acompañarte a consultas médicas:** escuchar al médico explicar la condición puede ser más convincente que cualquier explicación tuya
- **Reconoce su experiencia:** vivir con alguien que tiene dolor crónico también es difícil. Agradece su apoyo y valida sus emociones
- **Habla sobre la sexualidad abiertamente:** la dispareunia (dolor en relaciones sexuales) puede generar distancia emocional si no se aborda. Existen soluciones y alternativas

### 2. Grupos de apoyo entre pares

Conectar con otras pacientes proporciona una forma de validación que las personas sin endometriosis difícilmente pueden ofrecer:

- **Grupos presenciales:** busca asociaciones de endometriosis en tu ciudad. El contacto cara a cara genera vínculos más profundos
- **Comunidades virtuales:** foros, grupos de Facebook, comunidades de Reddit o Discord. Asegúrate de que estén moderadas por profesionales o pacientes informadas para evitar desinformación
- **Talleres y eventos:** conferencias de pacientes, webinars educativos, encuentros sociales organizados por asociaciones
- **Mentoring entre pares:** algunas organizaciones conectan pacientes recién diagnosticadas con pacientes experimentadas que pueden guiarlas

**Precaución:** los grupos de apoyo deben ser un espacio seguro, no una competencia de sufrimiento. Si un grupo te genera más ansiedad que alivio, busca otro con mejor dinámica.

### 3. Apoyo profesional especializado

Hay momentos en los que el apoyo de amigos y familia no es suficiente, y eso es completamente normal:

- **Terapia individual:** un psicólogo especializado en enfermedades crónicas entiende las particularidades del duelo crónico, la frustración con el sistema de salud, y las dinámicas emocionales del dolor
- **Terapia de pareja:** cuando la endometriosis está afectando la relación, un terapeuta puede facilitar la comunicación, abordar la intimidad sexual y ayudar a ambos a ajustar expectativas
- **Trabajo social:** puede ayudar con recursos laborales (adaptaciones, incapacidad temporal), acceso a servicios de salud y orientación sobre derechos
- **Grupos terapéuticos dirigidos:** diferentes a grupos de apoyo, estos son facilitados por un profesional de salud mental y combinan psicoeducación con procesamiento emocional grupal

### 4. Tu equipo médico como aliado

La relación con tu equipo de salud también es parte de tu red de apoyo:
- Busca profesionales que te escuchen, validen tu experiencia y respeten tu autonomía
- No te conformes con un médico que minimiza tus síntomas — mereces ser tomada en serio
- Un equipo multidisciplinario (ginecólogo, fisioterapeuta, nutricionista, psicólogo) ofrece mejor manejo que cualquier profesional aislado

## Comunicar tu dolor: guía práctica

Uno de los mayores desafíos es explicar un dolor invisible a personas que no lo experimentan:

- **Usa analogías concretas:** "imagina el peor cólico estomacal que hayas tenido, pero que dura horas y se extiende a toda la pelvis, la espalda y las piernas"
- **Comparte datos:** "la endometriosis afecta a 190 millones de personas y tarda en promedio 7 años en diagnosticarse"
- **Establece límites:** está bien decir "hoy no tengo energía para explicar, pero necesito que confíes en mí"
- **Acepta que algunos no entenderán:** no todas las personas en tu vida podrán acompañarte de la forma que necesitas, y eso no es tu culpa

## Mensaje final

Es completamente válido decir: "Hoy es un día difícil y necesito apoyo." Pedir ayuda no es debilidad — es sabiduría. Y no tienes que enfrentar la endometriosis sola. Tu red de apoyo está ahí, o puede construirse, un paso a la vez.`,
    citations: [
      'Young et al. (2015) J Endometriosis, 7(3):155-161',
      'Facchin et al. (2015) J Health Psychol, 20(11):1478-1487',
      'Eisenberger (2012) Nat Rev Neurosci, 13:421-434',
    ],
    phenotypeRelevance: ['nociplastic', 'nociceptive', 'neuropathic', 'mixed'],
    goalRelevance: ['general_wellbeing'],
    readTimeMinutes: 6,
    tags: ['apoyo', 'comunidad', 'relaciones'],
  },
  {
    id: 'wellbeing-productivity',
    pillarId: 'wellbeing',
    title: 'Endometriosis y Productividad Laboral',
    summary: 'Estrategias para manejar la endometriosis en el entorno laboral sin sacrificar tu salud.',
    contentMarkdown: `# Endometriosis y Productividad Laboral

La endometriosis tiene un impacto económico y laboral que frecuentemente se subestima tanto por empleadores como por la sociedad en general. Los estudios estiman que las pacientes pierden en promedio **10.8 horas de productividad por semana** debido a la combinación de ausentismo (días perdidos) y presentismo (estar presente pero con capacidad reducida). A nivel global, el costo anual por paciente se estima en $12,000-$20,000 USD entre costos médicos directos y pérdida de productividad.

Estas cifras no son solo estadísticas — representan carreras frenadas, oportunidades perdidas, estrés financiero y una carga emocional que se suma al peso de la enfermedad misma. Pero con las estrategias correctas, es posible mantener una vida profesional satisfactoria mientras cuidas tu salud.

## El impacto real en el trabajo

### Ausentismo
- Días perdidos por dolor severo, especialmente durante la menstruación
- Citas médicas frecuentes (ginecólogo, fisioterapia, psicólogo, ecografías)
- Recuperación post-quirúrgica (laparoscopias, que pueden requerir 1-3 semanas de baja)
- Efectos secundarios de medicamentos nuevos durante el período de ajuste

### Presentismo
- Trabajar con dolor de moderado a severo — la concentración, la creatividad y la productividad se reducen significativamente
- Fatiga crónica que dificulta mantener el rendimiento durante jornadas completas
- Niebla mental (problemas de concentración, memoria de trabajo reducida)
- Síntomas digestivos y necesidad frecuente de ir al baño
- Ansiedad anticipatoria por posibles episodios de dolor

### Impacto en la carrera a largo plazo
- Rechazo de promociones que implican más responsabilidad o viajes
- Cambio a trabajos menos demandantes pero también menos satisfactorios
- Brecha salarial relacionada con ausencias y limitaciones percibidas
- Estrés por ocultar la condición a colegas y superiores

## Estrategias de manejo laboral basadas en evidencia

### Planificación estratégica según el ciclo

Si tu ciclo es relativamente predecible (o estás bajo terapia hormonal que lo regula), puedes optimizar tu agenda profesional:

- **Fase folicular (post-menstruación):** programa reuniones importantes, presentaciones, proyectos que requieran máxima concentración. Es tu ventana de mayor energía y claridad mental
- **Ovulación:** aprovecha el pico de energía para tareas creativas y colaborativas
- **Fase lútea temprana:** mantén ritmo normal con tareas moderadas
- **Fase lútea tardía y menstrual:** reserva para tareas administrativas, organizativas o que permitan mayor flexibilidad. Ten un "plan B" para días imprevistos

### Adaptaciones del espacio de trabajo

Pequeños cambios en tu entorno laboral pueden hacer una diferencia significativa:

- **Cojín térmico discreto:** parches de calor adhesivos bajo la ropa o un cojín eléctrico para la silla (muchos son discretos y portátiles)
- **Alternancia sentada-parada:** un escritorio ajustable o un soporte para laptop que permita trabajar de pie reduce la presión pélvica. Cambiar de posición cada 30-45 minutos
- **Acceso fácil al baño:** fundamental para días de síntomas digestivos o cuando los AINEs afectan el estómago
- **Botiquín en el trabajo:** AINEs, paracetamol, parches térmicos, botella de agua, snacks saludables, cambio de ropa interior, toallas higiénicas extra
- **Ergonomía:** una buena silla con soporte lumbar y una posición correcta del monitor reducen el dolor musculoesquelético que se suma al pélvico

### Comunicación con tu empleador

Esta es una decisión profundamente personal. Algunos puntos a considerar:

- **Decides tú cuánto compartir** — no estás obligada a revelar tu diagnóstico en la mayoría de los países
- **Si decides informar,** enfócate en las adaptaciones específicas que necesitas (flexibilidad horaria, teletrabajo ocasional, pausas) en lugar de la historia médica completa
- **Conoce tus derechos laborales:** en muchos países, la endometriosis puede calificar como una condición que requiere adaptaciones razonables del puesto de trabajo. Consulta con un abogado laboral o sindicato si es necesario
- **Documenta tu condición:** un certificado médico que respalde la necesidad de adaptaciones fortalece tu posición, sin necesidad de revelar detalles clínicos
- **Evalúa la cultura organizacional:** en empresas con cultura inclusiva y gerentes empáticos, la transparencia puede abrir puertas. En ambientes hostiles, puede ser más prudente mantener la privacidad

### Trabajo remoto como herramienta terapéutica

La posibilidad de trabajar desde casa algunos días — especialmente los primeros días del período — puede ser invaluable:

- Puedes usar ropa cómoda, tener acceso a tu bolsa de agua caliente, descansar cuando lo necesites
- Elimina el estrés del transporte y la presión de "actuar como si nada"
- Permite mantener la productividad parcial en días que de otra forma serían de ausencia total
- Si tu empresa ofrece esquemas híbridos, negociar flexibilidad para los días más difíciles puede ser la adaptación más impactante

## Autocuidado profesional

- **No te castigues por los días difíciles** — la culpa no mejora la productividad y sí empeora el bienestar
- **Celebra lo que SÍ logras** — completar tareas con dolor es un logro extraordinario que merece reconocimiento
- **Establece límites realistas** — aprender a decir "no" o "necesito más tiempo" protege tu salud a largo plazo
- **Tu valor profesional no se define por tu condición de salud** — eres competente, capaz y valiosa, incluso en los días que el dolor intenta convencerte de lo contrario
- **Busca mentoras** con experiencia manejando enfermedad crónica y carrera profesional — existen y sus estrategias son invaluables`,
    citations: [
      'Nnoaham et al. (2011) Fertil Steril, 96(2):366-373.e8',
      'Soliman et al. (2017) J Manag Care Spec Pharm, 23(7):S2-S10',
      'Simoens et al. (2012) Hum Reprod, 27(5):1292-1299',
    ],
    phenotypeRelevance: ['nociplastic', 'nociceptive', 'neuropathic', 'mixed'],
    goalRelevance: ['general_wellbeing', 'improve_energy'],
    readTimeMinutes: 6,
    tags: ['trabajo', 'productividad', 'adaptaciones'],
  },
]
