import type { WebArticle } from '../../types'

export const HORMONES_ARTICLES: WebArticle[] = [
  {
    id: 'hormones-cycle-tracking',
    pillarId: 'hormones',
    title: 'Tracking del Ciclo Menstrual',
    summary: 'Cómo registrar y entender tu ciclo para un mejor manejo de la endometriosis.',
    contentMarkdown: `# Tracking del Ciclo Menstrual

El seguimiento del ciclo menstrual es una herramienta fundamental — y a menudo subutilizada — para el manejo de la endometriosis. Más allá de predecir cuándo llegará tu período, un tracking detallado te permite identificar patrones de síntomas, evaluar la efectividad de tu tratamiento, y comunicarte de forma precisa y fundamentada con tu equipo médico. En una condición donde cada paciente es única, tus propios datos son invaluables.

## ¿Qué registrar?

Para que el tracking sea realmente útil, necesita ser consistente y abarcar varias dimensiones. Dedica 2-3 minutos al final de cada día para registrar:

- **Fechas del período:** día de inicio (día 1 = primer día de sangrado real, no spotting) y último día de sangrado
- **Intensidad del flujo:** usa una escala consistente (ligero/moderado/abundante/muy abundante) o cuenta productos de higiene usados por día
- **Patrón de dolor:** ubicación precisa (pelvis izquierda, derecha, central, lumbar, piernas), intensidad en escala 0-10, tipo (punzante, sordo, quemazón, cólico), duración, y qué lo alivia o empeora
- **Síntomas por fase:** distensión abdominal, fatiga, náuseas, problemas digestivos, síntomas urinarios, dolor de cabeza
- **Estado de ánimo y energía:** ansiedad, irritabilidad, tristeza, nivel de energía (1-10), calidad del sueño
- **Medicación y respuesta:** qué tomaste, a qué hora, y qué tanto alivió los síntomas
- **Factores adicionales:** estrés, ejercicio, alimentación, calidad del sueño, relaciones sexuales (y si hubo dolor)

## Las 4 fases del ciclo y la endometriosis

### 1. Fase Menstrual (días 1-5)

Los niveles de estrógeno y progesterona caen a su mínimo, provocando el desprendimiento del endometrio. Para las pacientes con endometriosis, esta es generalmente la fase más sintomática: las lesiones endometriósicas también responden a esta caída hormonal, liberando prostaglandinas y citoquinas inflamatorias.

**Qué esperar:** dolor pélvico máximo, fatiga pronunciada, posible endo belly, alteraciones digestivas. Algunos estudios muestran que la sensibilidad al dolor es mayor durante esta fase.

**Recomendaciones:** descanso activo, calor local (bolsa de agua caliente, parches térmicos), AINEs preventivos (iniciar 1-2 días antes si es posible), alimentos reconfortantes y nutritivos, hidratación extra.

### 2. Fase Folicular (días 6-13)

El estrógeno comienza a subir gradualmente, preparando un nuevo folículo para la ovulación. La mayoría de las pacientes experimentan una mejoría significativa de los síntomas durante esta fase.

**Qué esperar:** aumento progresivo de energía, mejor ánimo, reducción del dolor, mejor tolerancia al ejercicio, mayor claridad mental.

**Recomendaciones:** aprovecha para aumentar la actividad física, programar actividades sociales y profesionales importantes, reponer nutrientes perdidos durante la menstruación (hierro, vitamina B12).

### 3. Ovulación (día ~14)

El estrógeno alcanza su pico y se produce la liberación del óvulo. La LH (hormona luteinizante) tiene un pico agudo.

**Qué esperar:** pico de energía en muchas pacientes, pero algunas experimentan dolor ovulatorio (mittelschmerz), que en endometriosis puede ser más intenso de lo normal, especialmente si hay endometriomas ováricos. Puede haber spotting ovulatorio ligero.

**Recomendaciones:** si experimentas dolor ovulatorio consistente, regístralo detalladamente — puede indicar la presencia de endometriomas o adherencias que afectan los ovarios.

### 4. Fase Lútea (días 15-28)

La progesterona domina esta fase. La temperatura basal sube 0.3-0.5°C, el metabolismo se acelera, y los síntomas premenstruales comienzan a aparecer gradualmente, especialmente en la segunda mitad (días 22-28).

**Qué esperar:** retención de líquidos progresiva, sensibilidad mamaria, cambios de humor (irritabilidad, ansiedad), aumento del endo belly, fatiga creciente hacia el final, posibles antojos de carbohidratos (fisiológicos, por el aumento del metabolismo basal).

**Recomendaciones:** priorizar autocuidado, reducir intensidad del ejercicio, aumentar el consumo de magnesio y alimentos ricos en triptófano, preparar el plan de manejo menstrual (tener medicación lista, avisar en el trabajo si es necesario).

## Beneficios documentados del tracking

1. **Predecir y planificar:** saber cuándo esperan los días difíciles permite reorganizar agenda, preparar medicación y avisar a tu entorno
2. **Evaluar tratamiento:** comparar meses muestra si un medicamento, suplemento o cambio de estilo de vida está funcionando objetivamente
3. **Documentar para consultas médicas:** los patrones registrados son más confiables que la memoria. Tu médico puede tomar mejores decisiones con datos concretos
4. **Identificar triggers:** algunos síntomas tienen triggers específicos (alimentos, estrés, falta de sueño) que solo se hacen evidentes con semanas de registro
5. **Empoderamiento:** conocer tu cuerpo reduce la ansiedad anticipatoria y te convierte en una participante activa en tu salud

## Herramientas para el tracking

La app de Saude está diseñada específicamente para pacientes con endometriosis, con seguimiento de dolor por fenotipo, ciclo menstrual, medicación, hábitos y bienestar. A diferencia de apps de ciclo genéricas, considera las particularidades de la endometriosis en sus algoritmos y recomendaciones.`,
    citations: [
      'ESHRE Endometriosis Guideline Development Group (2022)',
      'Nirgianakis et al. (2020) Fertil Steril, 114(2):306-316',
      'Horne & Missmer (2022) BMJ, 379:e070750',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'nociplastic', 'mixed'],
    goalRelevance: ['balance_hormones', 'improve_fertility', 'reduce_pain'],
    readTimeMinutes: 5,
    tags: ['ciclo menstrual', 'tracking', 'hormonas'],
    featured: true,
  },
  {
    id: 'hormones-treatment-options',
    pillarId: 'hormones',
    title: 'Opciones de Tratamiento Hormonal',
    summary: 'Revisión de terapias hormonales disponibles para endometriosis.',
    contentMarkdown: `# Opciones de Tratamiento Hormonal

La terapia hormonal es uno de los pilares fundamentales del tratamiento médico de la endometriosis. Su objetivo principal es suprimir o reducir la producción de estrógenos, la hormona que estimula el crecimiento y la activación del tejido endometrial ectópico. Comprender las opciones disponibles, sus mecanismos, beneficios y limitaciones te permite participar activamente en las decisiones de tratamiento con tu equipo médico.

## Principio general

Todas las terapias hormonales para endometriosis comparten un objetivo común: crear un ambiente hormonal que detenga o reduzca la actividad de las lesiones endometriósicas. Esto se logra reduciendo los estrógenos circulantes, suprimiendo la ovulación, o contrarrestando los efectos del estrógeno con progesterona. Ninguna terapia hormonal elimina las lesiones existentes — las controla y puede prevenir la progresión.

## Opciones principales con detalle

### Progestágenos

Los progestágenos son la primera línea de tratamiento hormonal en muchas guías clínicas internacionales, incluyendo las de la ESHRE.

**Dienogest (Visanne):**
- Específicamente aprobado para endometriosis, con extensa evidencia de eficacia
- Dosis: 2 mg/día de forma continua
- Eficacia comparable a agonistas GnRH pero con perfil de efectos secundarios mucho más favorable
- Reduce la dismenorrea en más del 70% de las pacientes y puede inducir regresión parcial de lesiones
- Efectos secundarios: sangrado irregular (especialmente los primeros 3 meses), dolor de cabeza, cambios de humor, sensibilidad mamaria

**Medroxiprogesterona de depósito (Depo-Provera):**
- Inyección intramuscular cada 3 meses
- Ventaja: no depende del cumplimiento diario
- Puede causar amenorrea (ausencia de menstruación) lo cual reduce significativamente el dolor
- Consideración: posible pérdida de densidad ósea con uso prolongado (>2 años), ganancia de peso

**Noretisterona (Noretindrona):**
- Opción oral accesible y económica
- Dosis: 5-15 mg/día de forma continua
- Efectos secundarios similares a otros progestágenos

### Anticonceptivos orales combinados (ACOs)

Los ACOs contienen estrógeno (etinilestradiol) + progestágeno. En endometriosis se usan de forma continua, sin la semana de descanso, para evitar la menstruación y el dolor asociado.

- Reducen la dismenorrea en 70-80% de las pacientes
- Son la opción más accesible económicamente y más familiar para las pacientes
- Pueden ser primera línea para pacientes jóvenes o con sospecha de endometriosis aún no confirmada
- Contraindicaciones: tabaquismo >35 años, migraña con aura, antecedentes tromboembólicos, hipertensión no controlada

### Agonistas GnRH

Inducen una menopausia médica reversible al suprimir la producción de estrógenos desde la hipófisis.

- **Leuprolide, goserelina, triptorelina:** inyecciones mensuales o trimestrales
- Muy efectivos para el dolor, pero con efectos secundarios significativos por la hipoestrogenemia: bochornos, sequedad vaginal, pérdida ósea, cambios de humor, disminución de la libido
- Requieren "add-back therapy" (estrógeno+progestágeno en dosis baja) para proteger los huesos y reducir síntomas menopáusicos
- Uso generalmente limitado a 6-12 meses por el impacto en la densidad ósea
- Reservados para casos que no responden a progestágenos o ACOs

### Antagonistas GnRH (nueva generación)

Representan un avance significativo por su mecanismo más modulable y formato oral.

- **Elagolix (Orilissa):** primer antagonista GnRH oral aprobado para endometriosis. Dos dosis: 150 mg/día (supresión parcial) o 200 mg dos veces al día (supresión mayor)
- **Relugolix combinado (Myfembree):** relugolix + estradiol + noretisterona en una sola tableta. Proporciona supresión hormonal con add-back incorporado, simplificando el régimen
- Ventajas: administración oral, supresión estrogénica modulable por dosis, inicio/cese de acción rápido, menos pérdida ósea que agonistas GnRH con el add-back integrado
- Limitaciones: costo elevado, disponibilidad variable por país

### DIU con Levonorgestrel (Mirena/Kyleena)

- Liberación local de progestágeno directamente en el útero
- Reduce significativamente el dolor y el sangrado menstrual
- Eficaz por 5 años con mínima intervención
- Especialmente útil después de cirugía para prevenir la recurrencia de la endometriosis
- Efectos secundarios: sangrado irregular inicial (3-6 meses), posible acné, rara vez expulsión del dispositivo

## Consideraciones para elegir

La elección del tratamiento hormonal debe ser individualizada, considerando:

- **Deseo de fertilidad:** las terapias hormonales impiden el embarazo durante su uso, pero la fertilidad se restablece al suspenderlas. Si planeas embarazarte pronto, el tratamiento hormonal no es apropiado
- **Edad y factores de riesgo cardiovascular:** los ACOs tienen restricciones en fumadoras >35 años y en pacientes con migraña con aura
- **Experiencia previa:** si un tratamiento previo causó efectos secundarios intolerables, hay alternativas
- **Preferencia personal:** algunas pacientes prefieren la autonomía del uso oral diario, otras valoran la comodidad de un DIU o inyección trimestral
- **Accesibilidad y costo:** varía significativamente por país y cobertura médica

## Punto importante

La terapia hormonal no es obligatoria. Algunas pacientes manejan sus síntomas efectivamente con cirugía, cambios de estilo de vida, fisioterapia y manejo del dolor sin hormonas. La decisión siempre debe ser tuya, informada por tu equipo médico.`,
    citations: [
      'Becker et al. (2022) Hum Reprod Open, 2022(2):hoac009',
      'Taylor et al. (2021) Lancet, 397(10276):839-852',
      'Vercellini et al. (2016) BMJ, 353:i1338',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'mixed'],
    goalRelevance: ['balance_hormones', 'reduce_pain'],
    readTimeMinutes: 5,
    tags: ['hormonas', 'tratamiento', 'medicamentos'],
  },
  {
    id: 'hormones-fertility',
    pillarId: 'hormones',
    title: 'Fertilidad y Endometriosis',
    summary: 'Opciones y consideraciones para la fertilidad con endometriosis.',
    contentMarkdown: `# Fertilidad y Endometriosis

El diagnóstico de endometriosis frecuentemente trae consigo preguntas y preocupaciones sobre la fertilidad. Es un tema cargado de emociones, incertidumbre y, a veces, información contradictoria. Esta guía busca ofrecerte información basada en evidencia, sin minimizar tus preocupaciones pero también sin generar alarma innecesaria, porque la realidad es más matizada de lo que muchas fuentes sugieren.

## ¿Cómo puede afectar la endometriosis la fertilidad?

La endometriosis puede interferir con la concepción a través de varios mecanismos, no todos presentes en cada paciente:

- **Distorsión de la anatomía pélvica:** adherencias y tejido cicatricial pueden bloquear o desplazar las trompas de Falopio, impidiendo la captura del óvulo
- **Ambiente inflamatorio pélvico:** las citoquinas y prostaglandinas producidas por las lesiones endometriósicas pueden ser tóxicas para los espermatozoides, el óvulo y el embrión
- **Alteración de la calidad ovocitaria:** la inflamación crónica y el estrés oxidativo pueden afectar la maduración de los óvulos
- **Endometriomas ováricos:** los quistes de endometriosis en los ovarios pueden comprimir tejido ovárico sano y reducir la reserva ovárica, especialmente si se han operado
- **Defectos de implantación:** alteraciones en la receptividad del endometrio eutópico (dentro del útero) pueden dificultar que el embrión se implante correctamente
- **Adenomiosis asociada:** la endometriosis frecuentemente coexiste con adenomiosis (endometriosis dentro del músculo uterino), que también puede afectar la implantación

## Datos que debes conocer

- **30-50% de las mujeres** con endometriosis pueden experimentar dificultades de fertilidad — pero esto también significa que **50-70% conciben sin asistencia**
- Muchas mujeres con endometriosis **logran embarazarse naturalmente**, especialmente con estadios leves a moderados
- La severidad de la endometriosis (estadio I-IV) **no siempre predice la fertilidad** — pacientes con estadio IV pueden concebir naturalmente, mientras que algunas con estadio I pueden tener dificultades
- La endometriosis no significa infertilidad — el término correcto es **subfertilidad** (fertilidad reducida, no ausente)
- La fecundabilidad mensual (probabilidad de concebir por ciclo) es del 2-10% vs 15-20% en la población general

## Opciones de tratamiento reproductivo

### Manejo expectante (espera activa)
Para pacientes menores de 35 años con endometriosis leve (estadio I-II), trompas permeables, pareja sin factor masculino, y menos de 12 meses intentando. La probabilidad acumulada de embarazo natural en 12 meses puede ser del 30-50%.

**Optimización:** timing de las relaciones sexuales con la ovulación, suplementación con ácido fólico (400-800 mcg/día), vitamina D, omega-3, estilo de vida saludable.

### Cirugía para fertilidad
La eliminación de lesiones endometriósicas (especialmente endometriosis profunda o adherencias que distorsionan la anatomía) puede mejorar las tasas de embarazo en pacientes seleccionadas.

- La escisión completa de endometriosis peritoneal superficial puede mejorar las tasas de concepción espontánea
- La cistectomía de endometriomas >4 cm puede mejorar la accesibilidad folicular para FIV, pero debe realizarse con técnica cuidadosa para preservar tejido ovárico sano
- **Precaución:** la cirugía ovárica repetida reduce la reserva ovárica. Evaluar riesgo/beneficio cuidadosamente con tu cirujano

### Estimulación ovárica + Inseminación Intrauterina (IIU)
- Combina medicamentos para estimular la maduración de múltiples folículos con la colocación directa de espermatozoides lavados en el útero
- Mejora la fecundabilidad 2-3 veces comparado con espera
- Generalmente se intentan 3-4 ciclos antes de considerar FIV
- Menos invasiva y menos costosa que FIV

### Fecundación In Vitro (FIV)
- Frecuentemente la mejor opción para endometriosis moderada-severa, trompas dañadas, endometriomas bilaterales o factor masculino asociado
- Las tasas de éxito por ciclo varían según la edad, la reserva ovárica y el centro reproductivo (30-50% por transferencia en mujeres <35 años)
- Protocolos específicos para pacientes con endometriosis pueden incluir supresión con agonistas GnRH antes del ciclo de FIV
- El congelamiento de embriones y la transferencia diferida pueden mejorar las tasas en presencia de endometriomas

## Planificación anticipada

- **Evaluar la reserva ovárica** con AMH (hormona anti-mülleriana) y conteo de folículos antrales por ecografía, especialmente antes de cirugías ováricas
- **Considerar criopreservación de óvulos o embriones** si planeas postergar la maternidad, especialmente si tienes endometriomas o necesitarás cirugía ovárica
- **Consultar con un especialista en reproducción** tempranamente — no esperar a tener un problema para informarte sobre tus opciones
- **Evitar cirugías ováricas innecesarias** que puedan reducir la reserva ovárica sin un beneficio reproductivo claro

## Mensaje importante

Tu valor como persona no está definido por tu fertilidad. Sea cual sea tu camino — concepción natural, tratamientos de reproducción asistida, adopción, o decidir no tener hijos — mereces apoyo, comprensión y respeto. La endometriosis impone suficientes cargas sin agregar la presión social sobre la maternidad. Tu bienestar integral siempre debe ser la prioridad.`,
    citations: [
      'Zondervan et al. (2020) N Engl J Med, 382(13):1244-1256',
      'Macer & Taylor (2012) Obstet Gynecol Clin North Am, 39(4):535-549',
      'Dunselman et al. (2014) Hum Reprod, 29(3):400-412',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'nociplastic', 'mixed'],
    goalRelevance: ['improve_fertility', 'balance_hormones'],
    readTimeMinutes: 5,
    tags: ['fertilidad', 'embarazo', 'FIV'],
  },
  {
    id: 'hormones-contraceptives',
    pillarId: 'hormones',
    title: 'Anticonceptivos Hormonales Explicados',
    summary: 'Guía completa sobre cómo los anticonceptivos hormonales se usan en el tratamiento de endometriosis.',
    contentMarkdown: `# Anticonceptivos Hormonales en Endometriosis

Los anticonceptivos hormonales son frecuentemente la primera línea de tratamiento para la endometriosis, recomendados tanto por la ESHRE como por la ACOG. Sin embargo, en este contexto no se prescriben para prevenir el embarazo (aunque lo hacen), sino como terapia médica para reducir el dolor, suprimir la progresión de la enfermedad y mejorar la calidad de vida. Comprender cómo funcionan específicamente en endometriosis te ayuda a tomar decisiones informadas y a tener expectativas realistas.

## ¿Cómo actúan los anticonceptivos en endometriosis?

Sus efectos terapéuticos van mucho más allá de la anticoncepción:

- **Suprimen la ovulación** y reducen los niveles de estrógeno circulante, la hormona que alimenta las lesiones endometriósicas
- **Adelgazan el endometrio** (tanto el eutópico como el ectópico), reduciendo el sangrado menstrual y la actividad de las lesiones
- **Disminuyen la producción de prostaglandinas** inflamatorias, reduciendo directamente el dolor y las contracciones uterinas
- **Pueden detener la progresión** de las lesiones endometriósicas y prevenir la formación de nuevas adherencias
- **El uso continuo** (sin semana de descanso) elimina la menstruación, suprimiendo el ciclo de activación inflamatoria que ocurre con cada período

## Tipos de anticonceptivos utilizados en endometriosis

### Píldora combinada (estrógeno + progestágeno)

La opción más accesible y prescrita globalmente. En endometriosis, se usa en régimen continuo — tomando la píldora todos los días sin hacer la pausa semanal.

- **Eficacia:** reduce la dismenorrea en 70-80% de las pacientes y el dolor pélvico crónico en un 50-60%
- **Administración:** 1 tableta diaria a la misma hora, de forma ininterrumpida
- **Opciones comunes:** etinilestradiol/dienogest, etinilestradiol/drospirenona (puede ayudar con retención de líquidos), etinilestradiol/desogestrel
- **Ventajas:** económica, ampliamente disponible, bien estudiada, reversible inmediatamente
- **Contraindicaciones absolutas:** tabaquismo en mayores de 35 años, migraña con aura, antecedentes de tromboembolismo venoso, hipertensión no controlada, hepatopatía activa
- **Sangrado por deprivación:** si aparece sangrado irregular molesto después de meses de uso continuo, tu médico puede recomendar una pausa planificada de 4 días para "resetear" el endometrio

### Dienogest (progestágeno puro)

El único progestágeno específicamente desarrollado y aprobado para el tratamiento de la endometriosis.

- **Eficacia:** comparable a agonistas GnRH en reducción del dolor pero con mucho mejor tolerabilidad. Estudios a largo plazo (hasta 65 meses) confirman eficacia sostenida
- **Mecanismo específico:** además de la supresión ovárica, dienogest tiene efectos anti-proliferativos directos sobre el tejido endometriósico
- **Dosis:** 2 mg/día de forma continua
- **Sangrado irregular:** es el efecto secundario más frecuente, especialmente en los primeros 3-6 meses. Generalmente se estabiliza con el tiempo
- **Ventaja sobre ACOs:** puede usarse en pacientes con migraña con aura o factores de riesgo cardiovascular, ya que no contiene estrógeno
- **Sin protección anticonceptiva confiable** — si necesitas anticoncepción, debe combinarse con un método de barrera

### DIU hormonal (Mirena/Kyleena)

Dispositivo intrauterino que libera levonorgestrel directamente en la cavidad uterina, con efecto predominantemente local.

- **Mecanismo:** atrofia del endometrio por acción local de progesterona, sin supresión sistémica significativa (la mayoría de las pacientes siguen ovulando)
- **Reducción del dolor:** eficaz para dismenorrea y dolor pélvico, especialmente útil cuando la endometriosis afecta predominantemente el útero y el compartimento posterior
- **Duración:** hasta 5 años (Mirena) o 3 años (Kyleena) sin necesidad de recordar tomas diarias
- **Post-cirugía:** especialmente valioso después de cirugía de endometriosis para prevenir la recurrencia. Estudios muestran reducción del 50-70% en la tasa de recurrencia de dismenorrea post-quirúrgica
- **Efecto secundario inicial:** sangrado irregular los primeros 3-6 meses, que generalmente evoluciona hacia amenorrea o sangrado mínimo

### Implante subdérmico (Implanon/Nexplanon)

Pequeña varilla que se inserta bajo la piel del brazo, liberando etonogestrel de forma continua.

- **Duración:** 3 años de eficacia
- **Ventaja:** ideal para pacientes que olvidan la toma diaria
- **Evidencia en endometriosis:** limitada pero prometedora. Puede ser una opción cuando la vía oral no es conveniente
- **Sangrado impredecible:** el patrón de sangrado es el efecto secundario más frecuente y la razón principal de discontinuación

## Efectos secundarios comunes y manejo

- **Sangrado irregular** (el más frecuente): generalmente mejora en 3-6 meses. Si persiste, puede requerir ajuste de formulación o pausa planificada
- **Cambios de humor:** monitorear y comunicar a tu médico. Si son significativos, considerar cambiar de progestágeno
- **Sensibilidad mamaria:** suele resolverse en los primeros ciclos
- **Retención de líquidos:** la drospirenona puede ayudar con este efecto
- **Cefalea:** evaluar patrón. Si desarrollas migraña con aura con un ACO combinado, se debe suspender y cambiar a un método solo con progestágeno

## Preguntas frecuentes

**¿Puedo tomarlos indefinidamente?** Sí, bajo supervisión médica regular. No hay evidencia de que el uso continuo a largo plazo sea perjudicial en pacientes sin contraindicaciones.

**¿Afectan la fertilidad futura?** No. La fertilidad se restablece rápidamente al suspenderlos (generalmente en 1-3 ciclos para ACOs, inmediatamente para el DIU).

**¿Cuánto tiempo tarda en hacer efecto?** La reducción del sangrado suele notarse en el primer mes. El alivio significativo del dolor puede tomar 2-3 meses de uso continuo.

**¿Puedo alternar entre tratamientos?** Sí, tu médico puede recomendar cambiar si un tratamiento no es bien tolerado o no es suficientemente eficaz.`,
    citations: [
      'Vercellini et al. (2016) BMJ, 353:i1338',
      'Becker et al. (2022) Hum Reprod Open, 2022(2):hoac009',
      'Brown et al. (2018) Cochrane Database Syst Rev, 5:CD001019',
    ],
    phenotypeRelevance: ['nociceptive', 'neuropathic', 'mixed'],
    goalRelevance: ['balance_hormones', 'reduce_pain'],
    readTimeMinutes: 6,
    tags: ['anticonceptivos', 'hormonas', 'tratamiento'],
  },
]
