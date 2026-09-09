import type { WebArticle } from '../../types'

export const PAIN_ARTICLES: WebArticle[] = [
  {
    id: 'endo-basics',
    pillarId: 'pain',
    title: '¿Qué es la Endometriosis?',
    summary: 'Guía completa sobre esta condición que afecta a 1 de cada 10 mujeres en edad reproductiva.',
    contentMarkdown: `# ¿Qué es la Endometriosis?

La endometriosis es una condición crónica en la que tejido similar al endometrio — la capa que recubre el interior del útero — crece fuera de este órgano. Este tejido puede encontrarse en los ovarios, las trompas de Falopio, la superficie exterior del útero, los ligamentos uterosacros, el peritoneo, la vejiga, el intestino e incluso, en casos raros, en órganos distantes como el diafragma o los pulmones.

Al igual que el endometrio normal, estas lesiones responden a las fluctuaciones hormonales del ciclo menstrual: crecen, se engrosan y se descomponen con cada ciclo. Sin embargo, a diferencia del tejido que se desprende durante la menstruación, el tejido endometrial fuera del útero no tiene una vía de salida. Esto genera inflamación crónica, formación de adherencias (bandas de tejido cicatricial) y, frecuentemente, dolor significativo.

## Síntomas comunes

Los síntomas varían enormemente entre pacientes, lo que dificulta el diagnóstico. Los más frecuentes incluyen:

- **Dolor pélvico intenso**, especialmente durante la menstruación (dismenorrea)
- **Dolor durante las relaciones sexuales** (dispareunia), particularmente con la penetración profunda
- **Dolor al orinar o defecar** durante el período menstrual
- **Sangrado abundante o irregular**, incluyendo sangrado entre períodos
- **Fatiga crónica** que no mejora con descanso adecuado
- **Problemas de fertilidad** — afecta al 30-50% de las pacientes
- **Síntomas digestivos** como distensión abdominal (endo belly), diarrea o estreñimiento cíclicos
- **Dolor lumbar o en las piernas** por afectación nerviosa

Es importante saber que la severidad de los síntomas no siempre se correlaciona con la extensión de la enfermedad. Algunas mujeres con lesiones mínimas experimentan dolor severo, mientras que otras con endometriosis extensa pueden ser asintomáticas.

## Datos importantes

- Afecta aproximadamente al **10% de las mujeres** en edad reproductiva a nivel mundial, unos 190 millones de personas
- El diagnóstico puede tardar entre **7-10 años** en promedio desde el inicio de los síntomas
- No existe cura definitiva, pero hay tratamientos efectivos para manejar los síntomas y mejorar la calidad de vida
- Cada mujer experimenta la endometriosis de manera diferente — no hay dos casos iguales
- La prevalencia real podría ser mayor, ya que muchas pacientes no reciben diagnóstico

## ¿Qué causa la endometriosis?

La causa exacta sigue siendo objeto de investigación activa. Las teorías más aceptadas incluyen:

1. **Menstruación retrógrada** — flujo menstrual que viaja hacia atrás a través de las trompas de Falopio y se deposita en la cavidad pélvica. Ocurre en la mayoría de las mujeres, pero solo algunas desarrollan endometriosis
2. **Metaplasia celómica** — células del peritoneo se transforman en tejido de tipo endometrial bajo influencia hormonal o inmunológica
3. **Factores inmunológicos** — alteraciones en la respuesta inmune que impiden la eliminación del tejido ectópico
4. **Factores genéticos** — el riesgo aumenta 6-10 veces con antecedentes familiares de primer grado
5. **Factores ambientales** — exposición a disruptores endocrinos como dioxinas y bisfenoles

Probablemente, la endometriosis resulta de una combinación de estos factores. La investigación actual se enfoca en comprender mejor la interacción entre genética, epigenética, inmunología y ambiente para desarrollar tratamientos más dirigidos.

## ¿Cuándo consultar?

Si experimentas dolor pélvico crónico, períodos muy dolorosos que interfieren con tu vida diaria, dolor durante las relaciones sexuales, o dificultad para concebir, consulta con un ginecólogo, preferiblemente especialista en endometriosis. Un diagnóstico temprano permite un mejor manejo de la enfermedad y puede preservar la fertilidad.`,
    citations: [
      'Zondervan et al. (2020) N Engl J Med, 382(13):1244-1256',
      'Taylor et al. (2021) Lancet, 397(10276):839-852',
      'Saunders & Horne (2021) Cell, 184(11):2807-2824',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'nociplastic', 'mixed'],
    goalRelevance: ['reduce_pain', 'general_wellbeing'],
    readTimeMinutes: 4,
    tags: ['básico', 'síntomas', 'diagnóstico'],
    featured: true,
  },
  {
    id: 'pain-phenotypes',
    pillarId: 'pain',
    title: 'Entendiendo los Fenotipos de Dolor',
    summary: 'Conoce los diferentes tipos de dolor asociados con la endometriosis y sus características.',
    contentMarkdown: `# Entendiendo los Fenotipos de Dolor

El dolor en la endometriosis no es igual para todas las pacientes. La investigación moderna ha identificado distintos mecanismos de dolor que pueden coexistir, y reconocer cuál predomina en tu caso puede guiar hacia tratamientos más efectivos. Este enfoque personalizado es clave para un manejo exitoso del dolor crónico.

## Los tres fenotipos principales

### Dolor Nociceptivo (Inflamatorio)

Es el dolor "clásico" causado por daño tisular directo. Las lesiones endometriósicas liberan sustancias inflamatorias (prostaglandinas, citoquinas) que activan los receptores de dolor en los tejidos circundantes.

**Características:**
- Dolor agudo y localizable en un área específica de la pelvis
- Empeora notablemente con la menstruación debido a la activación cíclica de las lesiones
- Responde bien a antiinflamatorios no esteroideos (AINEs)
- Se correlaciona con la ubicación de lesiones visibles en cirugía o imágenes
- Puede manifestarse como dolor profundo durante relaciones sexuales

**Tratamiento enfocado:** antiinflamatorios (ibuprofeno, naproxeno), terapia hormonal para suprimir la activación de lesiones, cirugía de escisión para remover el tejido ectópico. La combinación de tratamiento médico y quirúrgico suele ofrecer los mejores resultados.

### Dolor Neuropático (Nervioso)

Se produce cuando las lesiones endometriósicas invaden o comprimen nervios, o cuando la inflamación crónica daña las fibras nerviosas circundantes. Con el tiempo, los nervios pueden generar señales de dolor incluso sin un estímulo activo.

**Características:**
- Sensaciones de quemazón, hormigueo o "corrientazos"
- Dolor punzante, eléctrico o lancinante
- Puede irradiarse hacia las piernas, la zona lumbar o el perineo
- Persiste entre períodos menstruales
- A menudo no responde a analgésicos comunes

**Tratamiento enfocado:** medicamentos neuromoduladores (gabapentina, pregabalina, duloxetina), fisioterapia del suelo pélvico para liberar nervios comprimidos, técnicas de desensibilización neural, y en casos selectos, bloqueos nerviosos. La educación en neurociencia del dolor también ha demostrado beneficios significativos.

### Dolor Nociplástico (Sensibilización Central)

Ocurre cuando el sistema nervioso central se vuelve hipersensible debido a la exposición prolongada al dolor. El cerebro y la médula espinal amplifican las señales de dolor, de modo que estímulos normales se perciben como dolorosos (alodinia) o estímulos dolorosos se perciben como más intensos (hiperalgesia).

**Características:**
- Dolor difuso y generalizado que no se limita a la pelvis
- Sensibilidad aumentada al tacto, la presión o incluso la temperatura
- Fatiga severa, alteraciones del sueño y niebla mental asociadas
- Puede superponerse con fibromialgia, síndrome de vejiga dolorosa o síndrome de intestino irritable
- El dolor puede persistir incluso después de cirugía exitosa

**Tratamiento enfocado:** abordaje multidisciplinario que incluya terapia cognitivo-conductual, ejercicio gradual y progresivo, técnicas de neuroplasticidad, manejo del sueño y del estrés, y en algunos casos medicamentos como duloxetina o amitriptilina en dosis baja.

## Dolor Mixto

La mayoría de las pacientes con endometriosis experimentan una combinación de estos fenotipos, en proporciones variables. Un abordaje integral que reconozca cada componente es fundamental para un tratamiento personalizado y efectivo.

## ¿Por qué es importante conocer tu fenotipo?

1. **Tratamientos más dirigidos** — en lugar de una solución genérica, se pueden combinar terapias específicas para cada mecanismo
2. **Expectativas realistas** — entender que algunos tipos de dolor requieren tratamientos más complejos y tiempo para mejorar
3. **Comunicación con tu equipo médico** — describir tu dolor con precisión ayuda a tu médico a ajustar el tratamiento
4. **Empoderamiento** — comprender tu dolor reduce la ansiedad y la catastrofización, lo que a su vez puede reducir la intensidad percibida`,
    citations: [
      'Aredo et al. (2017) Pain, 158(11):2029-2043',
      'As-Sanie et al. (2019) Am J Obstet Gynecol, 220(3):255.e1-255.e9',
      'Woolf (2011) Pain, 152(3 Suppl):S2-S15',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'nociplastic', 'mixed'],
    goalRelevance: ['reduce_pain', 'general_wellbeing'],
    readTimeMinutes: 4,
    tags: ['dolor', 'fenotipos', 'tratamiento'],
    featured: true,
  },
  {
    id: 'pain-tens-guide',
    pillarId: 'pain',
    title: 'Terapia TENS para Endometriosis',
    summary: 'Cómo la estimulación eléctrica transcutánea puede aliviar el dolor pélvico crónico.',
    contentMarkdown: `# Terapia TENS para Endometriosis

La estimulación nerviosa eléctrica transcutánea (TENS) es una técnica no invasiva y segura que utiliza corrientes eléctricas de bajo voltaje para aliviar el dolor. Se aplica mediante electrodos adhesivos colocados sobre la piel, conectados a un dispositivo portátil del tamaño de un teléfono celular. Es una herramienta cada vez más utilizada por pacientes con endometriosis como complemento al tratamiento farmacológico.

## ¿Cómo funciona?

TENS actúa mediante dos mecanismos principales, dependiendo de la frecuencia utilizada:

- **Teoría de la compuerta (gate control):** a frecuencias altas (80-100 Hz), las señales eléctricas estimulan fibras nerviosas gruesas (A-beta) que "cierran la puerta" a las señales de dolor transmitidas por fibras más pequeñas (A-delta y C). El resultado es una reducción inmediata de la percepción dolorosa
- **Liberación de endorfinas:** a frecuencias bajas (2-10 Hz), TENS estimula la liberación de opioides endógenos (endorfinas y encefalinas) que producen un efecto analgésico más duradero, similar al alivio que produce el ejercicio

Además, TENS puede mejorar la circulación local, reducir la tensión muscular refleja y modular la actividad del sistema nervioso autónomo, contribuyendo a la relajación general de la musculatura pélvica.

## Evidencia en endometriosis

Los estudios clínicos respaldan la utilidad de TENS en el manejo del dolor asociado a endometriosis:

- Una revisión Cochrane encontró evidencia moderada de que TENS de alta frecuencia reduce significativamente la dismenorrea primaria y secundaria
- Estudios específicos en endometriosis demuestran reducción del dolor pélvico crónico en un 40-60% de las pacientes
- TENS ha mostrado eficacia comparable a AINEs en algunos estudios, pero sin los efectos secundarios gastrointestinales
- La combinación de TENS con otras modalidades (ejercicio, fisioterapia) produce resultados superiores a cualquier intervención aislada

## Recomendaciones de uso

### Parámetros para dolor agudo (menstrual)
- **Frecuencia:** 80-100 Hz
- **Duración de pulso:** 100-200 microsegundos
- **Duración de sesión:** 20-30 minutos
- **Intensidad:** aumentar gradualmente hasta sentir hormigueo fuerte pero cómodo

### Parámetros para dolor crónico
- **Frecuencia:** 2-10 Hz
- **Duración de pulso:** 200-400 microsegundos
- **Duración de sesión:** 30-45 minutos
- **Intensidad:** suficiente para producir contracciones musculares visibles pero no dolorosas

### Colocación de electrodos
- **Dolor suprapúbico:** dos electrodos en la región suprapúbica, dos en la zona lumbar baja (S2-S4)
- **Dolor lumbar:** cuatro electrodos en la zona lumbar, flanqueando la columna
- **Dolor pélvico lateral:** sobre el dermatoma correspondiente al área de dolor

## Ventajas de TENS

- No invasivo, sin efectos secundarios significativos (posible irritación cutánea leve)
- Puede usarse en casa de forma independiente una vez entrenada
- Compatible con otros tratamientos (farmacológicos, fisioterapia, terapia hormonal)
- Costo accesible a largo plazo tras la inversión inicial del dispositivo
- Portátil y discreto — se puede usar bajo la ropa durante actividades cotidianas
- Control personal sobre la intensidad y duración del tratamiento

## Contraindicaciones

No usar TENS si tienes marcapasos, epilepsia no controlada, sobre piel irritada o herida, durante el primer trimestre de embarazo, o directamente sobre el abdomen durante el embarazo. Consulta con tu médico antes de iniciar.`,
    citations: [
      'Mira et al. (2020) Cochrane Database Syst Rev, 10:CD011890',
      'Proctor et al. (2002) Cochrane Database Syst Rev, (1):CD002123',
      'Johnson & Martinson (2007) J Pain, 8(1):45-52',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic'],
    goalRelevance: ['reduce_pain', 'general_wellbeing'],
    readTimeMinutes: 4,
    tags: ['TENS', 'dolor', 'no invasivo'],
  },
  {
    id: 'pain-pelvic-floor',
    pillarId: 'pain',
    title: 'Ejercicios de Suelo Pélvico',
    summary: 'Fortalecimiento y relajación del suelo pélvico para manejo del dolor.',
    contentMarkdown: `# Ejercicios de Suelo Pélvico

El suelo pélvico es un grupo de músculos que se extiende como una hamaca desde el hueso púbico hasta el cóccix, sosteniendo los órganos pélvicos (vejiga, útero, recto). En pacientes con endometriosis, estos músculos frecuentemente desarrollan hipertonía (exceso de tensión) como respuesta protectora al dolor crónico, lo que paradójicamente genera más dolor y crea un ciclo difícil de romper.

## ¿Por qué es tan importante el suelo pélvico en endometriosis?

La relación entre endometriosis y disfunción del suelo pélvico es bidireccional:

- **El dolor crónico genera tensión muscular refleja** — el cuerpo contrae los músculos pélvicos como mecanismo de protección
- **La hipertonía pélvica amplifica el dolor** — músculos tensos desarrollan puntos gatillo (trigger points) que producen dolor referido
- **Las adherencias pueden restringir la movilidad** — tejido cicatricial limita el movimiento normal de los músculos y órganos
- **La respiración superficial empeora la tensión** — la falta de movimiento diafragmático impide la relajación natural del suelo pélvico

La fisioterapia pélvica puede reducir significativamente el dolor, mejorar la función sexual y aumentar la calidad de vida. Estudios muestran mejoría en el 60-80% de las pacientes que completan un programa supervisado.

## Ejercicios terapéuticos

### 1. Respiración diafragmática coordinada

La respiración profunda es la base de todo trabajo pélvico. El diafragma y el suelo pélvico se mueven en sincronía: al inhalar, ambos descienden; al exhalar, ambos ascienden.

**Técnica:** acuéstate boca arriba con las rodillas flexionadas. Coloca una mano en el pecho y otra en el abdomen. Inhala por la nariz expandiendo el abdomen (la mano inferior sube), siente cómo el suelo pélvico se relaja hacia abajo. Exhala lentamente por la boca, el abdomen desciende suavemente. Practica 5 minutos, 3 veces al día.

### 2. Kegels invertidos (relajación activa)

A diferencia de los Kegels tradicionales que fortalecen contrayendo, en endometriosis el enfoque debe ser la relajación. Los Kegels invertidos enseñan al suelo pélvico a soltar la tensión crónica.

**Técnica:** en la misma posición, inhala y visualiza que el suelo pélvico se abre como una flor, descendiendo suavemente. Mantén esa apertura 5 segundos. Exhala y permite que vuelva a su posición neutra sin contraer activamente. Repite 10 veces.

### 3. Estiramientos de caderas y pelvis

La musculatura de la cadera está íntimamente conectada con el suelo pélvico. Estirar los aductores, rotadores y flexores de cadera ayuda indirectamente a relajar la tensión pélvica.

- **Mariposa:** sentada, plantas de los pies juntas, deja caer las rodillas suavemente. 2 minutos.
- **Paloma (pigeon pose):** desde cuatro puntos, lleva una rodilla hacia adelante y extiende la otra pierna atrás. 1 minuto cada lado.
- **Piriforme:** acostada boca arriba, cruza un tobillo sobre la rodilla contraria, lleva las rodillas al pecho. 1 minuto cada lado.
- **Flexor de cadera:** en posición de zancada, hunde la cadera hacia el piso. 1 minuto cada lado.

### 4. Liberación miofascial

Utiliza una pelota de tenis o foam roller para liberar tensión en los músculos glúteos, aductores e isquiotibiales. Siéntate sobre la pelota, localiza un punto de tensión y mantén presión suave durante 30-60 segundos hasta sentir que el músculo se relaja.

## Frecuencia recomendada

- **Diariamente:** respiración diafragmática (5 min) + Kegels invertidos (5 min)
- **3-4 veces por semana:** estiramientos de cadera (10-15 min)
- **2-3 veces por semana:** liberación miofascial (10 min)
- Supervisión inicial de un fisioterapeuta especializado durante 4-6 sesiones

## Cuándo buscar ayuda profesional

- Si el dolor empeora al realizar los ejercicios
- Si hay incontinencia urinaria o fecal asociada
- Si no hay mejoría después de 4-6 semanas de práctica consistente
- Si hay dolor severo durante las relaciones sexuales
- Después de cirugía pélvica, para rehabilitación guiada`,
    citations: [
      'Mira et al. (2018) J Physiother, 64(3):151-158',
      'Goncalves et al. (2017) Eur J Obstet Gynecol Reprod Biol, 210:59-64',
      'Meissner et al. (2022) Arch Gynecol Obstet, 305(1):37-46',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic'],
    goalRelevance: ['reduce_pain', 'general_wellbeing'],
    readTimeMinutes: 4,
    tags: ['suelo pélvico', 'ejercicio', 'fisioterapia'],
  },
  {
    id: 'pain-nsaid-guide',
    pillarId: 'pain',
    title: 'Manejo Farmacológico del Dolor',
    summary: 'Guía sobre AINEs y otros analgésicos para endometriosis.',
    contentMarkdown: `# Manejo Farmacológico del Dolor

Los antiinflamatorios no esteroideos (AINEs) constituyen la primera línea de tratamiento para el dolor asociado a endometriosis. Sin embargo, el manejo farmacológico del dolor en esta condición va mucho más allá de un solo grupo de medicamentos. Comprender las opciones disponibles, sus mecanismos y la forma óptima de usarlos puede marcar una diferencia significativa en tu calidad de vida.

## AINEs: primera línea de tratamiento

Los AINEs actúan inhibiendo las enzimas ciclooxigenasa (COX-1 y COX-2), reduciendo la producción de prostaglandinas que causan inflamación, dolor y contracciones uterinas. Son más efectivos cuando se inician antes de que el dolor se instale.

### Opciones más utilizadas

- **Ibuprofeno:** 400-600 mg cada 6-8 horas (máximo 2400 mg/día). Buena relación eficacia-seguridad.
- **Naproxeno:** 500 mg cada 12 horas (máximo 1000 mg/día). Mayor duración de acción, conveniente para dolor sostenido.
- **Ácido mefenámico:** 500 mg cada 8 horas. Particularmente efectivo para la dismenorrea por su acción antiprostaglandínica específica.
- **Celecoxib:** 200 mg cada 12-24 horas. Inhibidor selectivo COX-2, menor riesgo gastrointestinal.

### Estrategia de uso preventivo

Iniciar el AINE 1-2 días antes del período esperado y mantenerlo de forma regular (no "a demanda") durante los primeros 2-3 días de menstruación resulta significativamente más efectivo que esperar a que el dolor sea intenso. Esto se debe a que es más fácil prevenir la cascada inflamatoria que detenerla una vez activada.

## Opciones para dolor que no responde a AINEs

### Paracetamol (Acetaminofén)
- Útil para dolor leve a moderado, puede combinarse con AINEs
- Dosis: 500-1000 mg cada 6-8 horas (máximo 3000 mg/día)
- No tiene efecto antiinflamatorio pero sí analgésico y antipirético
- Ventaja: no irrita el estómago

### Neuromoduladores para dolor neuropático
- **Gabapentina:** 300-1200 mg/día, especialmente útil para dolor tipo quemazón o corrientazo
- **Pregabalina:** 75-300 mg/día, similar mecanismo pero inicio de acción más rápido
- **Duloxetina:** 30-60 mg/día, actúa sobre las vías descendentes del dolor
- Estos medicamentos requieren inicio gradual y ajuste de dosis progresivo

### Antidepresivos en dosis baja
- **Amitriptilina:** 10-50 mg antes de dormir, modula las vías del dolor crónico
- **Nortriptilina:** alternativa con menos sedación
- No se prescriben para la depresión en estas dosis, sino específicamente por su efecto sobre las vías del dolor

### Opioides: último recurso
- Reservados para dolor severo refractario a otras opciones
- Alto riesgo de dependencia, tolerancia y efectos secundarios
- Pueden empeorar la sensibilización central a largo plazo (hiperalgesia inducida por opioides)
- Si son necesarios, usar la mínima dosis por el menor tiempo posible

## Consideraciones importantes

- **No exceder las dosis máximas diarias** — más dosis no significa más alivio, pero sí más riesgo
- **Tomar AINEs con alimentos** para proteger la mucosa gástrica
- **Consultar siempre con tu médico** antes de combinar medicamentos, especialmente con anticoagulantes, antihipertensivos o corticoides
- **Los AINEs prolongados requieren supervisión** — riesgo de úlceras, insuficiencia renal y eventos cardiovasculares
- **Llevar un diario de dolor** anotando qué medicamento usaste, a qué dosis y qué alivio obtuviste. Esta información es invaluable para tu médico

## Enfoque multimodal

El manejo farmacológico es más efectivo cuando se combina con otras estrategias: fisioterapia pélvica, ejercicio regular, manejo del estrés y terapia hormonal. Ningún medicamento por sí solo resuelve el dolor complejo de la endometriosis — el abordaje integral ofrece los mejores resultados.`,
    citations: [
      'Brown et al. (2017) Cochrane Database Syst Rev, 1:CD004753',
      'ESHRE Endometriosis Guideline Development Group (2022)',
      'Derry et al. (2015) Cochrane Database Syst Rev, 7:CD001751',
    ],
    phenotypeRelevance: ['nociceptive', 'mixed'],
    goalRelevance: ['reduce_pain'],
    readTimeMinutes: 4,
    tags: ['AINEs', 'analgésicos', 'farmacología'],
  },
  {
    id: 'pain-pelvic-physio',
    pillarId: 'pain',
    title: 'Fisioterapia Pélvica en Profundidad',
    summary: 'Guía completa sobre fisioterapia especializada del suelo pélvico para endometriosis.',
    contentMarkdown: `# Fisioterapia Pélvica en Profundidad

La fisioterapia pélvica es una intervención de primera línea para el dolor pélvico crónico asociado a endometriosis, respaldada por guías clínicas internacionales como las de la ESHRE y la ACOG. Un fisioterapeuta especializado en suelo pélvico puede evaluar y tratar las disfunciones musculoesqueléticas que amplifican y perpetúan el dolor, ofreciendo herramientas que te empoderan en el manejo de tus síntomas.

## ¿Por qué es una intervención clave?

El dolor crónico pélvico genera un ciclo de disfunción que se autoperpetúa:

1. **Dolor** por lesiones endometriósicas → respuesta protectora del cuerpo
2. **Contracción muscular refleja** del suelo pélvico, abdominales profundos, aductores y glúteos
3. **Hipertonía crónica** → desarrollo de puntos gatillo (nudos musculares dolorosos)
4. **Restricción fascial** → alteración de la movilidad de órganos y tejidos
5. **Más dolor** → más tensión → ciclo vicioso

La fisioterapia pélvica aborda cada eslabón de esta cadena. Además, el dolor crónico modifica la postura, la respiración y los patrones de movimiento, generando problemas secundarios (dolor lumbar, cervical, disfunción sexual) que también responden a esta terapia.

## ¿Qué esperar en una consulta?

### Evaluación inicial (60-90 minutos)

- **Historia clínica detallada:** síntomas, cirugías previas, función vesical e intestinal, actividad sexual, impacto emocional
- **Evaluación postural y biomecánica:** cómo te paras, caminas y te sientas. Los patrones compensatorios revelan tensiones ocultas
- **Evaluación respiratoria:** la respiración superficial o apical contribuye a la tensión pélvica
- **Evaluación externa del suelo pélvico:** palpación de músculos abdominales, aductores, glúteos e isquiotibiales para identificar puntos gatillo
- **Evaluación interna (opcional pero muy útil):** palpación vaginal o rectal para valorar tono muscular, puntos gatillo intrapélvicos, movilidad y coordinación. Solo se realiza con tu consentimiento expreso

### Tratamientos más utilizados

- **Liberación miofascial interna y externa:** presión sostenida sobre puntos gatillo hasta que el músculo se relaja. Puede generar molestia temporal pero alivia significativamente
- **Biofeedback electromiográfico:** sensores que muestran en tiempo real la actividad de tus músculos pélvicos, enseñándote a identificar cuándo están tensos y cómo relajarlos conscientemente
- **Ejercicios de relajación pélvica:** técnicas de "dejar ir" (down-training) que son lo opuesto a los Kegels tradicionales. Incluyen respiración diafragmática coordinada, visualización y relajación progresiva
- **Terapia manual visceral:** movilización suave de órganos pélvicos y tejidos conectivos que pueden estar restringidos por adherencias
- **Manejo del tejido cicatricial:** técnicas para mejorar la movilidad de cicatrices quirúrgicas (laparoscopia, cesárea) que pueden contribuir al dolor
- **TENS pélvico:** estimulación eléctrica transcutánea aplicada en puntos estratégicos
- **Educación en neurociencia del dolor:** comprender cómo funciona el dolor cambia la forma en que lo experimentas

## Plan de tratamiento típico

- **Fase inicial (4-8 semanas):** 1-2 sesiones semanales enfocadas en evaluación, liberación manual y educación
- **Fase intermedia (4-8 semanas):** sesiones semanales o quincenales con más énfasis en ejercicios activos y autonomía
- **Mantenimiento:** sesiones mensuales o a demanda, con programa domiciliario independiente
- **Programa domiciliario:** 10-15 minutos diarios de respiración, relajación y estiramientos

## Resultados respaldados por evidencia

- **60-80% de las pacientes** reportan reducción significativa del dolor
- **Mejora de la función sexual** en pacientes con dispareunia
- **Reducción del uso de analgésicos** en muchas pacientes
- **Mayor sensación de control** sobre los síntomas, reduciendo la ansiedad asociada
- Los beneficios se mantienen a largo plazo cuando se continúa con el programa domiciliario

## ¿Cómo encontrar un buen fisioterapeuta pélvico?

Busca un profesional certificado en fisioterapia del suelo pélvico, con experiencia en dolor crónico y endometriosis. Las asociaciones nacionales de fisioterapia pélvica suelen tener directorios de profesionales certificados. Una buena conexión terapéutica, donde te sientas escuchada y respetada, es tan importante como la formación técnica.`,
    citations: [
      'Mira et al. (2018) J Physiother, 64(3):151-158',
      'Awad et al. (2017) Eur J Obstet Gynecol Reprod Biol, 210:59-64',
      'Neville et al. (2012) Phys Ther, 92(9):1215-1223',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'mixed'],
    goalRelevance: ['reduce_pain', 'general_wellbeing'],
    readTimeMinutes: 4,
    tags: ['fisioterapia', 'suelo pélvico', 'rehabilitación'],
  },
]
