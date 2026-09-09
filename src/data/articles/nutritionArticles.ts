import type { WebArticle } from '../../types'

export const NUTRITION_ARTICLES: WebArticle[] = [
  {
    id: 'nutrition-antiinflammatory',
    pillarId: 'nutrition',
    title: 'Dieta Antiinflamatoria para Endometriosis',
    summary: 'Alimentos que reducen la inflamación y mejoran los síntomas de forma natural.',
    contentMarkdown: `# Dieta Antiinflamatoria para Endometriosis

La endometriosis es fundamentalmente una enfermedad inflamatoria, y la alimentación es una de las herramientas más accesibles para modular la inflamación sistémica. Aunque la dieta por sí sola no cura la endometriosis, una alimentación antiinflamatoria puede reducir significativamente la intensidad del dolor, mejorar los síntomas digestivos y complementar el tratamiento médico de forma sinérgica.

La evidencia científica respalda que ciertos patrones alimentarios — particularmente la dieta mediterránea — se asocian con menor severidad de síntomas en pacientes con endometriosis. No se trata de restricciones extremas ni de "dietas milagro", sino de priorizar alimentos que nutren y protegen mientras reduces aquellos que promueven la inflamación.

## Alimentos recomendados

### Ácidos grasos Omega-3
El pilar de la dieta antiinflamatoria. Los omega-3 (EPA y DHA) compiten con los omega-6 por las enzimas COX y LOX, desviando la producción de prostaglandinas hacia mediadores antiinflamatorios.

**Fuentes:** salmón silvestre, sardinas, caballa, anchoas, nueces, semillas de chía, semillas de lino molidas. Objetivo: 2-3 porciones de pescado graso por semana o suplementación con 1-3 g de EPA+DHA diarios.

### Frutas y verduras ricas en antioxidantes
Los antioxidantes neutralizan los radicales libres que perpetúan la inflamación y el daño tisular.

**Destacados:** espinacas, kale, brócoli, coliflor (crucíferas que apoyan el metabolismo estrogénico), arándanos, fresas, frambuesas (ricos en antocianinas), granada (ácido elágico), tomate cocido (licopeno más biodisponible). **Objetivo:** 7-9 porciones diarias de frutas y verduras variadas de diferentes colores.

### Especias antiinflamatorias
Pequeñas cantidades con grandes beneficios cuando se incorporan regularmente:

- **Cúrcuma:** 1-2 cucharaditas con pimienta negra (la piperina aumenta la absorción 2000%). Agrega a sopas, guisos, huevos, batidos
- **Jengibre:** fresco o en polvo, 1-2 g diarios. Efecto comparable a ibuprofeno en dismenorrea según algunos estudios
- **Canela de Ceilán:** puede ayudar a regular la glucosa y reducir inflamación. 1/2 cucharadita diaria

### Grasas saludables
- **Aceite de oliva extra virgen:** rico en oleocantal, un compuesto con propiedades similares al ibuprofeno. Usar como grasa principal para cocinar y aderezar (2-4 cucharadas diarias)
- **Aguacate:** grasas monoinsaturadas, potasio y fibra. 1/2 a 1 aguacate diario
- **Nueces y semillas:** almendras, nueces de Brasil (ricas en selenio), semillas de calabaza (zinc y magnesio)

### Té verde
Las catequinas del té verde, especialmente la epigalocatequina galato (EGCG), han demostrado en estudios preclínicos la capacidad de inhibir la proliferación de células endometriósicas y reducir la angiogénesis. 2-3 tazas diarias.

### Alimentos ricos en fibra
La fibra ayuda a eliminar el exceso de estrógenos a través del tracto digestivo. Legumbres, granos integrales, verduras y frutas aportan fibra que alimenta las bacterias beneficiosas del intestino. Objetivo: 25-35 g de fibra diaria, aumentando gradualmente para evitar distensión.

## Alimentos a limitar o evitar

- **Carnes rojas procesadas:** embutidos, jamón, salchichas. Contienen nitratos y promueven la inflamación. Los estudios asocian mayor consumo de carne roja con mayor riesgo de endometriosis
- **Azúcares refinados:** refrescos, dulces, pastelería industrial. Provocan picos de insulina que estimulan la producción de prostaglandinas inflamatorias
- **Grasas trans y aceites refinados:** margarinas, frituras, alimentos ultraprocesados. Promueven directamente la inflamación vascular y tisular
- **Alcohol:** interfiere con el metabolismo hepático de estrógenos, aumentando los niveles circulantes. Limitar a máximo 1-2 copas por semana o evitar durante la fase menstrual
- **Lácteos:** evaluar individualmente. Algunas pacientes mejoran significativamente al reducirlos, mientras otras no notan diferencia. Considerar eliminación temporal de 4-6 semanas como prueba
- **Gluten:** no todas las pacientes con endometriosis son sensibles al gluten, pero un subgrupo significativo reporta mejoría al eliminarlo. Considerar eliminación temporal si hay síntomas digestivos prominentes

## Consejos prácticos de implementación

1. **Lleva un diario alimentario** durante 4-6 semanas anotando qué comes y cómo te sientes. Busca correlaciones entre alimentos y síntomas
2. **Introduce cambios gradualmente** — transformar tu alimentación de golpe es abrumador y difícil de sostener
3. **Consulta con un nutricionista** especializado en endometriosis o enfermedades inflamatorias para un plan personalizado
4. **Prepara comidas con anticipación** (meal prep) para los días en que el dolor dificulta cocinar
5. **No te obsesiones** — una dieta antiinflamatoria del 80% del tiempo es sostenible y efectiva. La perfección no existe ni es necesaria`,
    citations: [
      'Nodler et al. (2020) Hum Reprod Update, 26(5):752-776',
      'Parazzini et al. (2013) Eur J Obstet Gynecol Reprod Biol, 169(2):220-225',
      'Yamamoto et al. (2018) Reprod Biomed Online, 37(2):195-205',
    ],
    phenotypeRelevance: ['nociceptive', 'nociplastic', 'mixed'],
    goalRelevance: ['control_belly', 'reduce_pain', 'general_wellbeing', 'improve_fertility'],
    readTimeMinutes: 5,
    tags: ['dieta', 'antiinflamatorio', 'alimentos'],
    featured: true,
  },
  {
    id: 'nutrition-endo-belly',
    pillarId: 'nutrition',
    title: 'Endo Belly: Causas y Manejo',
    summary: 'Entendiendo y manejando la distensión abdominal en endometriosis.',
    contentMarkdown: `# Endo Belly: Causas y Manejo

La distensión abdominal severa, conocida coloquialmente como "endo belly", es uno de los síntomas más visibles, frustrantes y socialmente incómodos de la endometriosis. Puede hacer que el abdomen se vea como si estuvieras en un embarazo avanzado, apareciendo de forma repentina y durando horas o incluso días. Muchas pacientes reportan que el endo belly les causa tanta angustia como el dolor mismo, afectando su autoestima, su forma de vestir y su disposición a participar en actividades sociales.

## ¿Qué es exactamente el endo belly?

Es una distensión abdominal severa y frecuentemente dolorosa que va más allá de la hinchazón común. Se caracteriza por:

- Aparición rápida, a veces en cuestión de horas
- Aumento visible del perímetro abdominal (algunas pacientes reportan cambios de 2-4 tallas en un día)
- Sensación de presión, tensión y plenitud intensa
- Puede ser doloroso al tacto
- Frecuentemente empeora a lo largo del día
- Patrón cíclico pero también puede ocurrir de forma impredecible

## Causas principales

El endo belly es multifactorial — rara vez tiene una sola causa:

- **Inflamación intestinal directa:** cuando las lesiones endometriósicas se encuentran en el intestino, el recto o el peritoneo cercano, liberan citoquinas inflamatorias (IL-6, TNF-alfa, prostaglandinas) que causan edema e inflamación de la pared intestinal
- **Disbiosis del microbioma:** las pacientes con endometriosis frecuentemente muestran alteraciones en la composición de su microbioma intestinal, con menor diversidad bacteriana y mayor proporción de bacterias proinflamatorias. Esta disbiosis altera la fermentación de los alimentos y la producción de gas
- **Adherencias y tejido cicatricial:** las adherencias pueden distorsionar la anatomía intestinal, crear zonas de estrechamiento parcial y alterar la motilidad (el movimiento normal del intestino), lo que favorece la acumulación de gas y líquido
- **Sensibilidad alimentaria:** muchas pacientes desarrollan intolerancias alimentarias, especialmente a FODMAPs (carbohidratos fermentables), gluten o lácteos
- **SIBO (Sobrecrecimiento Bacteriano del Intestino Delgado):** se estima que hasta el 40% de las pacientes con endometriosis pueden tener SIBO, donde bacterias que normalmente habitan el colon proliferan en el intestino delgado, causando fermentación excesiva
- **Disfunción del suelo pélvico:** la hipertonía pélvica puede impedir la evacuación normal de gases

## Estrategias de manejo basadas en evidencia

### 1. Diario alimentario detallado
Registra durante 4-6 semanas: qué comes (incluyendo cantidades), a qué hora, y cómo te sientes en las siguientes 2-6 horas. Incluye nivel de distensión (1-10), dolor y otros síntomas. Esto permite identificar patrones y triggers individuales que son únicos para cada persona.

### 2. Dieta baja en FODMAPs (supervisada)
Los FODMAPs son carbohidratos de cadena corta que fermentan rápidamente en el intestino, produciendo gas. La dieta baja en FODMAPs tiene tres fases:

- **Eliminación (2-6 semanas):** se retiran todos los alimentos altos en FODMAPs
- **Reintroducción (6-8 semanas):** se reintroduce un grupo a la vez para identificar cuáles causan síntomas
- **Personalización:** dieta sostenible a largo plazo basada en tu tolerancia individual

**Importante:** esta dieta debe realizarse bajo supervisión de un nutricionista capacitado. Es restrictiva y hacerla mal puede empeorar la disbiosis.

### 3. Probióticos dirigidos
No todos los probióticos son iguales. Las cepas con mejor evidencia para síntomas digestivos en el contexto de endometriosis incluyen:
- *Lactobacillus rhamnosus GG* y *Lactobacillus acidophilus*
- *Bifidobacterium longum* y *Bifidobacterium lactis*
- Dosis: al menos 10 mil millones de UFC/día durante mínimo 8 semanas

### 4. Comidas pequeñas y frecuentes
Comer 5-6 porciones pequeñas en lugar de 3 grandes reduce la carga digestiva y la distensión postprandial. Masticar lentamente (20-30 masticaciones por bocado) y comer en un ambiente tranquilo, sin pantallas.

### 5. Manejo del estrés intestinal
El estrés activa directamente el eje intestino-cerebro, alterando la motilidad intestinal, la secreción de enzimas digestivas y la permeabilidad de la barrera intestinal. Practicar respiración diafragmática antes de las comidas y técnicas de relajación puede reducir significativamente la distensión.

### 6. Actividad física suave
Caminatas después de comer (10-15 minutos), yoga con posturas de torsión suave y movimientos que favorezcan la motilidad intestinal ayudan a movilizar el gas y reducir la distensión.

## Cuándo consultar

Si el endo belly es severo, frecuente o empeora progresivamente, consulta con tu médico para descartar SIBO (test de hidrógeno en aire espirado), intolerancias alimentarias específicas, o endometriosis intestinal que pueda requerir intervención quirúrgica.`,
    citations: [
      'Ek et al. (2015) BMC Womens Health, 15:83',
      'Shan et al. (2021) Reprod Sci, 28(9):2413-2420',
      'Moore et al. (2017) Hum Reprod, 32(8):1621-1630',
    ],
    phenotypeRelevance: ['nociceptive', 'nociplastic', 'mixed'],
    goalRelevance: ['control_belly', 'reduce_pain'],
    readTimeMinutes: 5,
    tags: ['endo belly', 'distensión', 'digestivo'],
  },
  {
    id: 'nutrition-hydration',
    pillarId: 'nutrition',
    title: 'Hidratación y Salud Pélvica',
    summary: 'Cómo la hidratación adecuada impacta los síntomas de endometriosis.',
    contentMarkdown: `# Hidratación y Salud Pélvica

La hidratación adecuada es un componente frecuentemente subestimado en el manejo integral de la endometriosis. Mientras la atención se enfoca en medicamentos, cirugía y dieta, muchas pacientes no reconocen que la deshidratación — incluso leve — puede amplificar significativamente varios de sus síntomas más molestos.

## ¿Por qué la hidratación importa en endometriosis?

El agua constituye aproximadamente el 60% del peso corporal y participa en prácticamente todos los procesos fisiológicos. En el contexto de la endometriosis, una hidratación adecuada es particularmente relevante por varios mecanismos:

### Reducción de la hinchazón y retención de líquidos
Parece paradójico, pero beber más agua reduce la retención de líquidos. Cuando el cuerpo detecta deshidratación, activa mecanismos de retención (aldosterona, hormona antidiurética) que causan hinchazón. La hidratación constante le indica al cuerpo que puede liberar el exceso de líquido de forma segura.

### Mejora de la función intestinal
El estreñimiento es extremadamente común en endometriosis y empeora tanto el dolor pélvico como el endo belly. El agua es esencial para mantener las heces blandas y facilitar el tránsito intestinal. Sin hidratación adecuada, la fibra dietética puede empeorar el estreñimiento en lugar de mejorarlo.

### Apoyo a la desintoxicación hepática
El hígado metaboliza y elimina el exceso de estrógenos circulantes, que estimulan el crecimiento del tejido endometriósico. Una hidratación adecuada apoya la función hepática y renal, facilitando la eliminación de estrógenos y sus metabolitos a través de la bilis y la orina.

### Reducción de la fatiga y mejora cognitiva
La deshidratación del 1-2% — que puede ocurrir sin sentir sed — reduce la energía, empeora la concentración y aumenta la irritabilidad. En pacientes que ya experimentan fatiga crónica por la endometriosis, la deshidratación amplifica el problema.

### Mantenimiento de la mucosa saludable
Las membranas mucosas del tracto urinario y reproductivo requieren hidratación adecuada para mantener su función de barrera. La deshidratación puede aumentar el riesgo de infecciones urinarias, que ya son más frecuentes en pacientes con endometriosis vesical.

### Modulación del dolor
Estudios sugieren que la deshidratación reduce el umbral del dolor. Mantener una hidratación óptima puede contribuir a que los analgésicos funcionen de manera más efectiva.

## Recomendaciones prácticas

### ¿Cuánta agua necesitas?
- **Línea base:** 30-35 mL por kilogramo de peso corporal (ej: 65 kg → 2-2.3 litros)
- **Ajustar por actividad:** agrega 500 mL por cada 30 minutos de ejercicio
- **Ajustar por clima:** aumenta 500-750 mL en días calurosos o secos
- **Indicador práctico:** tu orina debe ser de color amarillo pálido (como limonada diluida), no oscura ni completamente transparente

### Fuentes de hidratación
- **Agua pura:** la base de tu hidratación (60-70% del total)
- **Infusiones herbales sin cafeína:** manzanilla (antiinflamatoria, calmante digestiva), jengibre (digestiva, antiinflamatoria, puede ayudar con náuseas), menta (relajante del músculo liso intestinal, alivia espasmos), rooibos (antioxidante, sin cafeína natural)
- **Agua con electrolitos:** especialmente útil durante la menstruación, después del ejercicio o en días de calor. Puedes preparar tu propia versión con agua + pizca de sal marina + limón
- **Alimentos ricos en agua:** sandía, pepino, apio, lechuga, fresas, naranja (contribuyen hasta un 20% de tu hidratación diaria)

### ¿Qué limitar?
- **Cafeína:** máximo 200-300 mg/día (1-2 tazas de café). La cafeína es diurética y puede irritar la vejiga. En algunas pacientes empeora la ansiedad y los espasmos
- **Bebidas azucaradas:** refrescos, jugos industriales, bebidas energéticas. Promueven inflamación y picos de insulina
- **Alcohol:** deshidrata directamente, interfiere con el metabolismo de estrógenos y altera la calidad del sueño

## Tips para crear el hábito

1. **Empieza el día con un vaso de agua tibia** (con o sin limón) — rehidrata después de 7-8 horas de sueño
2. **Lleva siempre una botella reutilizable** — la disponibilidad facilita el hábito. Elige una que te guste y que sea fácil de llevar
3. **Establece recordatorios** — usa la app de Saude o alarmas cada 1-2 horas hasta que el hábito se automatice
4. **Sustituye gradualmente** — reemplaza una bebida azucarada o cafeinada diaria por agua o infusión
5. **Bebe antes de las comidas** — un vaso 15-20 minutos antes de comer mejora la digestión
6. **Hidrátate más durante la menstruación** — la pérdida de sangre, el posible uso de AINEs y la inflamación aumentan tus necesidades`,
    citations: [
      'ACOG Practice Bulletin (2021) Obstet Gynecol, 137(6):e128-e146',
      'Popkin et al. (2010) Nutr Rev, 68(8):439-458',
    ],
    phenotypeRelevance: ['nociceptive', 'nociplastic', 'mixed'],
    goalRelevance: ['control_belly', 'improve_energy'],
    readTimeMinutes: 5,
    tags: ['hidratación', 'agua', 'infusiones'],
  },
  {
    id: 'nutrition-gut-brain',
    pillarId: 'nutrition',
    title: 'Eje Intestino-Cerebro en Endometriosis',
    summary: 'Cómo la conexión entre tu intestino y tu cerebro influye en los síntomas de endometriosis.',
    contentMarkdown: `# Eje Intestino-Cerebro en Endometriosis

La comunicación bidireccional entre el intestino y el cerebro — conocida como el eje intestino-cerebro — es un área de investigación que ha transformado nuestra comprensión de la endometriosis en los últimos años. Esta conexión ayuda a explicar por qué tantas pacientes con endometriosis experimentan síntomas digestivos prominentes, y por qué el estrés empeora tanto el dolor como la distensión abdominal.

## ¿Qué es el eje intestino-cerebro?

Es un sistema de comunicación continua que conecta cuatro componentes principales:

- **El sistema nervioso entérico:** una red de 500 millones de neuronas que recubren el tracto digestivo, operando semi-independientemente del cerebro. Se le llama el "segundo cerebro" porque produce más del 90% de la serotonina del cuerpo y utiliza más de 30 neurotransmisores
- **El microbioma intestinal:** una comunidad de 100 billones de microorganismos (bacterias, hongos, virus) que pesa aproximadamente 1.5 kg y contiene más material genético que todo el genoma humano
- **El sistema nervioso central:** cerebro y médula espinal, que procesan las señales provenientes del intestino a través del nervio vago (la "autopista" de información entre ambos órganos)
- **El sistema inmune intestinal:** el 70-80% del sistema inmune reside en el tejido linfoide asociado al intestino (GALT), vigilando constantemente el contenido intestinal

La comunicación es bidireccional: el cerebro influye en la función intestinal (por eso el estrés causa problemas digestivos), y el intestino influye en el cerebro (por eso la disbiosis puede causar ansiedad, depresión y alteraciones cognitivas).

## Relevancia específica en endometriosis

### El "estroboloma" — microbioma y estrógenos
Se ha descubierto que ciertas bacterias intestinales producen una enzima llamada beta-glucuronidasa que reactiva estrógenos que el hígado ya había inactivado para su eliminación. En pacientes con disbiosis, estas bacterias pueden estar sobrerrepresentadas, lo que recircula estrógenos y contribuye al crecimiento de lesiones endometriósicas. Este subconjunto del microbioma se denomina "estroboloma".

### Disbiosis intestinal documentada
Estudios han encontrado que las pacientes con endometriosis muestran consistentemente:
- Menor diversidad bacteriana global
- Reducción de bacterias protectoras como *Lactobacillus* y *Bifidobacterium*
- Aumento de bacterias proinflamatorias incluyendo ciertas especies de *Escherichia*, *Shigella* y *Gardnerella*
- Alteración de la producción de ácidos grasos de cadena corta (butirato, propionato) que mantienen la integridad de la barrera intestinal

### Inflamación sistémica amplificada
La disbiosis compromete la barrera intestinal ("intestino permeable"), permitiendo que fragmentos bacterianos (lipopolisacáridos) pasen al torrente sanguíneo. Esto activa el sistema inmune de forma crónica, produciendo citoquinas inflamatorias que alimentan tanto los síntomas digestivos como el dolor pélvico y la fatiga.

### Sensibilización visceral cruzada
Los nervios que inervan el intestino y los que inervan los órganos pélvicos comparten vías en la médula espinal. La inflamación intestinal puede sensibilizar estos nervios compartidos, amplificando la percepción de dolor en la pelvis incluso cuando las lesiones endometriósicas están estables. Este fenómeno de "sensibilización cruzada" explica por qué mejorar la salud intestinal frecuentemente mejora el dolor pélvico.

## Estrategias para optimizar el eje intestino-cerebro

### 1. Prebióticos (alimento para las bacterias beneficiosas)
Los prebióticos son fibras específicas que las bacterias beneficiosas fermentan para producir ácidos grasos de cadena corta, especialmente butirato, que nutre las células del colon y reduce la inflamación.

**Fuentes:** alcachofas, espárragos, cebollas, ajo, plátanos verdes, avena, semillas de lino. Introducir gradualmente para evitar distensión.

### 2. Probióticos con cepas específicas
No todos los probióticos son iguales. Las cepas con mejor evidencia en el contexto del eje intestino-cerebro incluyen:
- *Lactobacillus rhamnosus* GG — una de las cepas más estudiadas para salud intestinal
- *Bifidobacterium longum* — puede reducir la respuesta al estrés y mejorar el ánimo
- *Lactobacillus helveticus* R0052 + *B. longum* R0175 — combinación con evidencia en reducción de ansiedad

### 3. Alimentos fermentados
Los fermentados aportan bacterias vivas y metabolitos beneficiosos: kefir (más diverso que el yogur), chucrut y kimchi sin pasteurizar (ricos en *Lactobacillus*), kombucha (en cantidad moderada, 100-200 mL/día), miso y tempeh.

### 4. Reducción del estrés crónico
El estrés es uno de los mayores disruptores del microbioma. El cortisol crónico altera directamente la composición bacteriana, aumenta la permeabilidad intestinal y reduce la motilidad.

Estrategias prioritarias: meditación regular, respiración diafragmática (estimula el nervio vago), yoga, contacto social positivo, tiempo en naturaleza, sueño suficiente.

### 5. Evitar disruptores del microbioma
- Antibióticos innecesarios (usar solo cuando sean realmente indicados)
- Edulcorantes artificiales (sucralosa, aspartame alteran el microbioma)
- Alimentos ultraprocesados (emulsificantes y aditivos dañan la barrera intestinal)
- Estrés crónico sin manejo
- AINEs prolongados (pueden alterar la mucosa intestinal con uso crónico)`,
    citations: [
      'Shan et al. (2021) Reprod Sci, 28(9):2413-2420',
      'Leonardi et al. (2020) Hum Reprod Update, 26(2):214-246',
      'Cryan & Dinan (2012) Nat Rev Neurosci, 13:701-712',
      'Baker et al. (2017) Fertil Steril, 107(1):28-36',
    ],
    phenotypeRelevance: ['nociplastic', 'nociceptive', 'neuropathic', 'mixed'],
    goalRelevance: ['control_belly', 'general_wellbeing', 'reduce_pain'],
    readTimeMinutes: 5,
    tags: ['microbioma', 'intestino', 'eje gut-brain'],
  },
]
