import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Heart, Apple, Activity, Brain, Search, X, ChevronRight, Bookmark, BookmarkCheck, Clock, Tag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import styles from './Library.module.css'

// Article categories
type CategoryId = 'all' | 'nutrition' | 'exercise' | 'emotional' | 'medical'

interface Category {
  id: CategoryId
  name: string
  icon: React.ReactNode
  color: string
}

const CATEGORIES: Category[] = [
  { id: 'all', name: 'Todos', icon: <BookOpen size={18} />, color: 'var(--color-primary)' },
  { id: 'nutrition', name: 'Nutrición', icon: <Apple size={18} />, color: 'var(--color-success)' },
  { id: 'exercise', name: 'Ejercicio', icon: <Activity size={18} />, color: 'var(--color-accent)' },
  { id: 'emotional', name: 'Bienestar Emocional', icon: <Brain size={18} />, color: 'var(--color-info)' },
  { id: 'medical', name: 'Información Médica', icon: <Heart size={18} />, color: 'var(--color-secondary)' },
]

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: CategoryId
  readTime: number
  tags: string[]
  featured?: boolean
}

const ARTICLES: Article[] = [
  {
    id: 'endo-basics',
    title: '¿Qué es la Endometriosis?',
    excerpt: 'Guía completa sobre esta condición que afecta a 1 de cada 10 mujeres en edad reproductiva.',
    content: `La endometriosis es una condición crónica en la que tejido similar al endometrio (el revestimiento del útero) crece fuera del útero. Este tejido puede encontrarse en los ovarios, las trompas de Falopio, la superficie exterior del útero y otros órganos pélvicos.

**Síntomas comunes:**
• Dolor pélvico intenso, especialmente durante la menstruación
• Dolor durante las relaciones sexuales
• Dolor al orinar o defecar durante el período
• Sangrado abundante o irregular
• Fatiga crónica
• Problemas de fertilidad

**Datos importantes:**
• Afecta aproximadamente al 10% de las mujeres en edad reproductiva
• El diagnóstico puede tardar entre 7-10 años en promedio
• No existe cura, pero hay tratamientos efectivos para manejar los síntomas
• Cada mujer experimenta la endometriosis de manera diferente

**¿Qué causa la endometriosis?**
La causa exacta es desconocida, pero hay varias teorías:
1. Menstruación retrógrada
2. Transformación de células
3. Factores inmunológicos
4. Factores genéticos

Si experimentas estos síntomas, es importante consultar con un especialista para obtener un diagnóstico y tratamiento adecuado.`,
    category: 'medical',
    readTime: 5,
    tags: ['básico', 'síntomas', 'diagnóstico'],
    featured: true,
  },
  {
    id: 'anti-inflammatory-diet',
    title: 'Dieta Antiinflamatoria para la Endometriosis',
    excerpt: 'Descubre qué alimentos pueden ayudar a reducir la inflamación y aliviar los síntomas.',
    content: `Una dieta antiinflamatoria puede ser una herramienta poderosa para manejar los síntomas de la endometriosis. La inflamación es un factor clave en esta condición, y lo que comes puede influir significativamente en cómo te sientes.

**Alimentos recomendados:**

🥬 **Verduras de hoja verde**
Espinacas, kale, acelgas - ricas en antioxidantes y fibra.

🐟 **Pescados grasos**
Salmón, sardinas, caballa - fuentes de omega-3 antiinflamatorio.

🫐 **Frutas del bosque**
Arándanos, frambuesas, moras - alto contenido de antioxidantes.

🥜 **Frutos secos**
Nueces, almendras - grasas saludables y vitamina E.

🫒 **Aceite de oliva extra virgen**
Rico en polifenoles antiinflamatorios.

🍵 **Té verde**
Catequinas con propiedades antiinflamatorias.

**Alimentos a evitar o limitar:**

❌ Carnes rojas y procesadas
❌ Productos lácteos (en algunas mujeres)
❌ Gluten (si hay sensibilidad)
❌ Azúcar refinada
❌ Alcohol
❌ Cafeína en exceso
❌ Alimentos ultraprocesados

**Consejos prácticos:**
1. Lleva un diario de alimentos para identificar triggers personales
2. Introduce cambios gradualmente
3. Consulta con un nutricionista especializado
4. Mantente hidratada
5. Considera suplementos de omega-3 y vitamina D`,
    category: 'nutrition',
    readTime: 6,
    tags: ['dieta', 'antiinflamatorio', 'alimentos'],
    featured: true,
  },
  {
    id: 'gentle-exercise',
    title: 'Ejercicios Suaves para Días de Dolor',
    excerpt: 'Rutinas de bajo impacto que pueden ayudar a aliviar el dolor pélvico y mejorar el bienestar.',
    content: `El ejercicio regular puede ayudar a manejar los síntomas de la endometriosis, pero es importante elegir actividades apropiadas, especialmente en días de mayor dolor.

**Beneficios del ejercicio:**
• Libera endorfinas (analgésicos naturales)
• Reduce el estrés y la ansiedad
• Mejora la circulación
• Fortalece los músculos del core
• Ayuda a mantener un peso saludable

**Ejercicios recomendados:**

🧘 **Yoga restaurativo**
Posturas suaves como la postura del niño, gato-vaca, y piernas en la pared.

🏊 **Natación**
Ejercicio de bajo impacto que no ejerce presión sobre la pelvis.

🚶 **Caminatas suaves**
15-30 minutos a ritmo moderado.

🌬️ **Respiración diafragmática**
Ayuda a relajar los músculos pélvicos.

💪 **Estiramientos de cadera**
Alivian la tensión en la zona pélvica.

**Rutina para días difíciles (15 min):**

1. **Respiración profunda** (2 min)
   Inhala 4 segundos, mantén 4, exhala 6.

2. **Postura del niño** (3 min)
   Rodillas separadas, brazos extendidos.

3. **Gato-vaca** (3 min)
   Movimientos suaves siguiendo la respiración.

4. **Estiramiento de mariposa** (3 min)
   Plantas de los pies juntas, deja caer las rodillas.

5. **Piernas en la pared** (4 min)
   Relaja completamente mientras la sangre circula.

**Importante:**
• Escucha a tu cuerpo
• No te fuerces en días de mucho dolor
• Consulta con tu médico antes de comenzar
• La consistencia es más importante que la intensidad`,
    category: 'exercise',
    readTime: 5,
    tags: ['yoga', 'ejercicio', 'dolor'],
  },
  {
    id: 'emotional-wellbeing',
    title: 'Manejo del Estrés y la Ansiedad',
    excerpt: 'Estrategias para cuidar tu salud mental mientras vives con endometriosis.',
    content: `Vivir con una condición crónica como la endometriosis puede afectar significativamente tu salud mental. Es normal sentir frustración, tristeza o ansiedad. Aquí encontrarás herramientas para cuidar tu bienestar emocional.

**El impacto emocional:**
• Frustración por el dolor crónico
• Ansiedad sobre el futuro
• Sentimientos de aislamiento
• Depresión relacionada con la enfermedad
• Estrés por la imprevisibilidad de los síntomas

**Estrategias de manejo:**

🧠 **Mindfulness y meditación**
Practicar la atención plena puede ayudar a manejar el dolor y reducir el estrés. Empieza con 5 minutos diarios.

📝 **Journaling**
Escribir sobre tus sentimientos y experiencias puede ser terapéutico y ayudarte a identificar patrones.

👥 **Comunidad de apoyo**
Conectar con otras mujeres que viven con endometriosis puede reducir el sentimiento de soledad.

🗣️ **Terapia profesional**
Un psicólogo especializado en enfermedades crónicas puede proporcionar herramientas valiosas.

**Técnicas de relajación rápida:**

1. **Respiración 4-7-8**
   Inhala 4 seg, mantén 7, exhala 8.

2. **Escaneo corporal**
   Recorre mentalmente tu cuerpo relajando cada zona.

3. **Visualización**
   Imagina un lugar seguro y tranquilo.

4. **Grounding 5-4-3-2-1**
   5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas.

**Señales de que necesitas ayuda profesional:**
• Sentimientos persistentes de tristeza o desesperanza
• Pérdida de interés en actividades que disfrutabas
• Cambios significativos en el sueño o apetito
• Pensamientos de hacerte daño

**Recuerda:**
No estás sola. Pedir ayuda es un acto de valentía, no de debilidad. Tu salud mental es tan importante como tu salud física.`,
    category: 'emotional',
    readTime: 7,
    tags: ['salud mental', 'estrés', 'ansiedad'],
    featured: true,
  },
  {
    id: 'pain-phenotypes',
    title: 'Entendiendo los Fenotipos de Dolor',
    excerpt: 'Conoce los diferentes tipos de dolor asociados con la endometriosis y sus características.',
    content: `El dolor en la endometriosis no es igual para todas. Entender tu tipo de dolor puede ayudarte a encontrar tratamientos más efectivos.

**Los tres fenotipos principales:**

🔴 **Dolor Nociceptivo**
Es el dolor "clásico" causado por daño tisular.

*Características:*
• Dolor agudo y localizable
• Empeora con la menstruación
• Responde bien a antiinflamatorios
• Se correlaciona con lesiones visibles

*Tratamiento enfocado:*
• Antiinflamatorios (NSAIDs)
• Terapia hormonal
• Cirugía para remover lesiones

🟡 **Dolor Neuropático**
Causado por daño o disfunción del sistema nervioso.

*Características:*
• Sensaciones de quemazón, hormigueo
• Dolor punzante o eléctrico
• Puede persistir sin estímulo
• A veces no responde a analgésicos comunes

*Tratamiento enfocado:*
• Medicamentos neuromoduladores
• Fisioterapia del suelo pélvico
• Técnicas de desensibilización

🟠 **Dolor Nociplástico (Sensibilización Central)**
El sistema nervioso se vuelve hipersensible.

*Características:*
• Dolor difuso y generalizado
• Sensibilidad aumentada (alodinia)
• Fatiga asociada
• Puede incluir fibromialgia

*Tratamiento enfocado:*
• Abordaje multidisciplinario
• Terapia cognitivo-conductual
• Ejercicio gradual
• Manejo del sueño

**Dolor Mixto**
Muchas mujeres experimentan una combinación de estos fenotipos, lo que requiere un enfoque de tratamiento personalizado.

**¿Por qué es importante conocer tu fenotipo?**
1. Permite tratamientos más dirigidos
2. Ayuda a establecer expectativas realistas
3. Facilita la comunicación con tu equipo médico
4. Empodera tu participación en las decisiones de tratamiento`,
    category: 'medical',
    readTime: 6,
    tags: ['dolor', 'fenotipos', 'tratamiento'],
  },
  {
    id: 'supplements',
    title: 'Suplementos que Pueden Ayudar',
    excerpt: 'Una guía sobre vitaminas y suplementos que algunas mujeres encuentran beneficiosos.',
    content: `Algunos suplementos pueden complementar el tratamiento de la endometriosis. Siempre consulta con tu médico antes de comenzar cualquier suplemento.

**Suplementos con evidencia:**

💊 **Omega-3 (EPA/DHA)**
*Beneficios:* Propiedades antiinflamatorias
*Dosis típica:* 1-3g diarios
*Fuentes:* Aceite de pescado, aceite de algas

💊 **Vitamina D**
*Beneficios:* Regulación inmune, puede reducir dolor
*Dosis típica:* 1000-4000 UI (según niveles)
*Nota:* Es importante medir niveles antes de suplementar

💊 **Magnesio**
*Beneficios:* Relajación muscular, reduce calambres
*Dosis típica:* 200-400mg
*Formas recomendadas:* Glicinato o citrato

💊 **Vitamina B6**
*Beneficios:* Puede ayudar con síntomas premenstruales
*Dosis típica:* 50-100mg
*Precaución:* No exceder 200mg/día

💊 **Cúrcuma (Curcumina)**
*Beneficios:* Antiinflamatorio natural
*Dosis típica:* 500-1000mg con piperina
*Nota:* La piperina mejora la absorción

💊 **NAC (N-Acetil Cisteína)**
*Beneficios:* Antioxidante, algunos estudios prometedores
*Dosis típica:* 600-1800mg
*Estudios:* Investigación en curso

**Consideraciones importantes:**

⚠️ **Interacciones**
Algunos suplementos pueden interactuar con medicamentos. Informa siempre a tu médico.

⚠️ **Calidad**
Elige marcas certificadas con pruebas de terceros.

⚠️ **Expectativas**
Los suplementos complementan, no reemplazan, el tratamiento médico.

⚠️ **Individualidad**
Lo que funciona para una persona puede no funcionar para otra.

**Preguntas para tu médico:**
1. ¿Hay algún suplemento contraindicado para mí?
2. ¿Debo hacerme análisis de niveles de vitaminas?
3. ¿Cuánto tiempo debería probar un suplemento antes de evaluar si funciona?`,
    category: 'nutrition',
    readTime: 5,
    tags: ['suplementos', 'vitaminas', 'tratamiento natural'],
  },
  {
    id: 'sleep-tips',
    title: 'Mejora tu Calidad de Sueño',
    excerpt: 'El descanso es fundamental para manejar el dolor crónico. Aprende a dormir mejor.',
    content: `El sueño de calidad es esencial para manejar la endometriosis. La falta de sueño puede empeorar el dolor y la fatiga.

**¿Por qué el sueño importa?**
• El cuerpo se repara durante el sueño profundo
• La privación de sueño aumenta la sensibilidad al dolor
• Afecta el sistema inmune y hormonal
• Impacta el estado de ánimo y la energía

**Higiene del sueño:**

🌙 **Horario consistente**
Acuéstate y levántate a la misma hora, incluso fines de semana.

📱 **Desconexión digital**
Sin pantallas 1 hora antes de dormir. La luz azul interfiere con la melatonina.

🌡️ **Temperatura óptima**
Mantén tu habitación entre 18-20°C.

🛏️ **Ambiente oscuro**
Usa cortinas blackout o antifaz.

☕ **Limita estimulantes**
No cafeína después de las 2pm.

**Rutina nocturna recomendada:**

1. **2 horas antes:** Cena ligera
2. **1 hora antes:** Apaga dispositivos, prepara ropa
3. **45 min antes:** Baño tibio o ducha
4. **30 min antes:** Té de manzanilla o lavanda
5. **15 min antes:** Estiramientos suaves o meditación
6. **En la cama:** Respiración profunda o body scan

**Posiciones para dormir con dolor pélvico:**

😴 **De lado con almohada entre rodillas**
Alivia la presión en la pelvis.

😴 **Posición fetal suave**
Puede reducir la tensión en el abdomen.

😴 **Boca arriba con almohada bajo rodillas**
Relaja la zona lumbar y pélvica.

**Si no puedes dormir por el dolor:**
• Aplica calor suave en el abdomen
• Prueba técnicas de respiración
• No mires el reloj constantemente
• Si llevas más de 20 min despierta, levántate y haz algo relajante hasta tener sueño`,
    category: 'emotional',
    readTime: 5,
    tags: ['sueño', 'descanso', 'rutina'],
  },
  {
    id: 'fertility-endo',
    title: 'Endometriosis y Fertilidad',
    excerpt: 'Lo que necesitas saber sobre cómo la endometriosis puede afectar la fertilidad.',
    content: `La endometriosis puede afectar la fertilidad, pero muchas mujeres con esta condición logran embarazarse. Aquí encontrarás información basada en evidencia.

**¿Cómo afecta la fertilidad?**

La endometriosis puede impactar la fertilidad de varias formas:
• Distorsión de la anatomía pélvica
• Inflamación que afecta la calidad de los óvulos
• Alteraciones en el ambiente uterino
• Posibles problemas de implantación

**Datos importantes:**

📊 30-50% de mujeres con endometriosis pueden experimentar dificultades de fertilidad

📊 Muchas mujeres con endometriosis conciben naturalmente

📊 La severidad de la endometriosis no siempre predice la fertilidad

**Opciones de tratamiento:**

🩺 **Manejo expectante**
Para casos leves, intentar concebir naturalmente por 6-12 meses.

🩺 **Cirugía**
La eliminación de lesiones puede mejorar las tasas de embarazo en algunos casos.

🩺 **Estimulación ovárica + IIU**
Aumenta las probabilidades con inseminación intrauterina.

🩺 **Fecundación In Vitro (FIV)**
Puede ser la mejor opción para casos más complejos.

**Preguntas para tu especialista:**

1. ¿Cuál es mi reserva ovárica actual?
2. ¿La cirugía mejoraría mis posibilidades?
3. ¿Cuánto tiempo debería intentar naturalmente?
4. ¿Cuáles son mis opciones de preservación de fertilidad?

**Apoyo emocional:**

El camino hacia la maternidad con endometriosis puede ser emocionalmente desafiante. Es normal sentir:
• Frustración
• Ansiedad
• Duelo por el camino esperado
• Presión social

**Recursos de apoyo:**
• Grupos de apoyo de fertilidad
• Psicólogos especializados
• Comunidades online de mujeres en situaciones similares

**Mensaje importante:**
Tu valor no está definido por tu fertilidad. Sea cual sea tu camino, mereces apoyo y comprensión.`,
    category: 'medical',
    readTime: 7,
    tags: ['fertilidad', 'embarazo', 'tratamiento'],
  },
]

// Storage key for saved articles
const SAVED_ARTICLES_KEY = 'saude_saved_articles'

function getSavedArticles(): string[] {
  try {
    const saved = localStorage.getItem(SAVED_ARTICLES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function toggleSavedArticle(articleId: string): string[] {
  const saved = getSavedArticles()
  const index = saved.indexOf(articleId)
  if (index > -1) {
    saved.splice(index, 1)
  } else {
    saved.push(articleId)
  }
  localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(saved))
  return saved
}

// Article Card Component
const ArticleCard: React.FC<{
  article: Article
  isSaved: boolean
  onToggleSave: () => void
  onOpen: () => void
}> = ({ article, isSaved, onToggleSave, onOpen }) => {
  const category = CATEGORIES.find(c => c.id === article.category)

  return (
    <motion.article
      className={styles.articleCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      data-testid={`article-${article.id}`}
    >
      {article.featured && (
        <span className={styles.featuredBadge}>Destacado</span>
      )}
      
      <div className={styles.cardHeader}>
        <span 
          className={styles.categoryTag}
          style={{ backgroundColor: `${category?.color}15`, color: category?.color }}
        >
          {category?.icon}
          {category?.name}
        </span>
        <button
          className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleSave() }}
          aria-label={isSaved ? 'Quitar de guardados' : 'Guardar artículo'}
          data-testid={`save-${article.id}`}
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      <h3 className={styles.cardTitle}>{article.title}</h3>
      <p className={styles.cardExcerpt}>{article.excerpt}</p>

      <div className={styles.cardFooter}>
        <span className={styles.readTime}>
          <Clock size={14} />
          {article.readTime} min de lectura
        </span>
        <button 
          className={styles.readBtn}
          onClick={onOpen}
          data-testid={`read-${article.id}`}
        >
          Leer más
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.article>
  )
}

// Article Modal Component
const ArticleModal: React.FC<{
  article: Article | null
  onClose: () => void
  isSaved: boolean
  onToggleSave: () => void
}> = ({ article, onClose, isSaved, onToggleSave }) => {
  if (!article) return null
  const category = CATEGORIES.find(c => c.id === article.category)

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.articleModal}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        role="dialog"
        aria-modal="true"
        data-testid="article-modal"
      >
        <div className={styles.modalHeader}>
          <span 
            className={styles.categoryTag}
            style={{ backgroundColor: `${category?.color}15`, color: category?.color }}
          >
            {category?.icon}
            {category?.name}
          </span>
          <div className={styles.modalActions}>
            <button
              className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
              onClick={onToggleSave}
              aria-label={isSaved ? 'Quitar de guardados' : 'Guardar artículo'}
            >
              {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
              <X size={20} />
            </button>
          </div>
        </div>

        <h1 className={styles.modalTitle}>{article.title}</h1>
        
        <div className={styles.modalMeta}>
          <span className={styles.readTime}>
            <Clock size={14} />
            {article.readTime} min de lectura
          </span>
          <div className={styles.tags}>
            {article.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.modalContent}>
          {article.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <h2 key={index} className={styles.contentHeading}>{paragraph.replace(/\*\*/g, '')}</h2>
            }
            if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
              return <p key={index} className={styles.contentItalic}>{paragraph.replace(/\*/g, '')}</p>
            }
            if (paragraph.startsWith('•') || paragraph.startsWith('❌') || paragraph.startsWith('⚠️')) {
              return <p key={index} className={styles.contentList}>{paragraph}</p>
            }
            if (paragraph.match(/^[🔴🟡🟠💊🧘🏊🚶🌬️💪🧠📝👥🗣️🌙📱🌡️🛏️☕😴📊🩺🥬🐟🫐🥜🫒🍵]/)) {
              return <p key={index} className={styles.contentEmoji}>{paragraph}</p>
            }
            if (paragraph.match(/^\d+\./)) {
              return <p key={index} className={styles.contentNumbered}>{paragraph}</p>
            }
            return paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main Library Component
const Library: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedArticles, setSavedArticles] = useState<string[]>(() => getSavedArticles())
  const [openArticle, setOpenArticle] = useState<Article | null>(null)
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  const filteredArticles = useMemo(() => {
    let articles = ARTICLES

    if (showSavedOnly) {
      articles = articles.filter(a => savedArticles.includes(a.id))
    }

    if (selectedCategory !== 'all') {
      articles = articles.filter(a => a.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    return articles
  }, [selectedCategory, searchQuery, savedArticles, showSavedOnly])

  const handleToggleSave = (articleId: string) => {
    const newSaved = toggleSavedArticle(articleId)
    setSavedArticles(newSaved)
  }

  const featuredArticles = ARTICLES.filter(a => a.featured)

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.header 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerIcon}>
            <BookOpen size={32} />
          </div>
          <h1>Biblioteca de Conocimiento</h1>
          <p>Recursos y artículos para entender y manejar la endometriosis</p>
        </motion.header>

        {/* Search and Filters */}
        <motion.div 
          className={styles.filters}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              data-testid="library-search"
            />
            {searchQuery && (
              <button 
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.categoryFilters}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ 
                  '--cat-color': cat.color,
                  borderColor: selectedCategory === cat.id ? cat.color : 'transparent'
                } as React.CSSProperties}
                data-testid={`category-${cat.id}`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {isAuthenticated && (
            <button
              className={`${styles.savedToggle} ${showSavedOnly ? styles.active : ''}`}
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              data-testid="show-saved-toggle"
            >
              <BookmarkCheck size={18} />
              <span>Guardados ({savedArticles.length})</span>
            </button>
          )}
        </motion.div>

        {/* Featured Section (only on all category, no search) */}
        {selectedCategory === 'all' && !searchQuery && !showSavedOnly && (
          <motion.section
            className={styles.featuredSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>Artículos Destacados</h2>
            <div className={styles.featuredGrid}>
              {featuredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isSaved={savedArticles.includes(article.id)}
                  onToggleSave={() => handleToggleSave(article.id)}
                  onOpen={() => setOpenArticle(article)}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* All Articles */}
        <motion.section
          className={styles.articlesSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(selectedCategory !== 'all' || searchQuery || showSavedOnly) && (
            <h2 className={styles.sectionTitle}>
              {showSavedOnly ? 'Artículos Guardados' : 
               searchQuery ? `Resultados para "${searchQuery}"` :
               CATEGORIES.find(c => c.id === selectedCategory)?.name}
              <span className={styles.resultsCount}>({filteredArticles.length})</span>
            </h2>
          )}

          {filteredArticles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {filteredArticles
                .filter(a => selectedCategory !== 'all' || searchQuery || showSavedOnly || !a.featured)
                .map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ArticleCard
                      article={article}
                      isSaved={savedArticles.includes(article.id)}
                      onToggleSave={() => handleToggleSave(article.id)}
                      onOpen={() => setOpenArticle(article)}
                    />
                  </motion.div>
                ))}
            </div>
          ) : (
            <motion.div 
              className={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen size={48} />
              <p>No se encontraron artículos</p>
              <span>Prueba con otros términos de búsqueda o categorías</span>
            </motion.div>
          )}
        </motion.section>

        {/* Article Modal */}
        {openArticle && (
          <ArticleModal
            article={openArticle}
            onClose={() => setOpenArticle(null)}
            isSaved={savedArticles.includes(openArticle.id)}
            onToggleSave={() => handleToggleSave(openArticle.id)}
          />
        )}
      </motion.div>
    </div>
  )
}

export default Library
