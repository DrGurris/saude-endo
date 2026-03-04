# PRD — Saude Clínica de la Mujer

## Descripción del Proyecto
Plataforma web de salud femenina especializada en endometriosis. Permite a las pacientes evaluar su tipo de dolor (fenotipo), recibir resultados personalizados y acceder a un portal de bienestar basado en 5 pilares de salud.

## Stack Tecnológico
- **Framework**: Vite + React 19 + TypeScript
- **Routing**: React Router DOM v7
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Estilos**: CSS Modules + variables CSS personalizadas
- **Iconos**: Lucide React
- **Fuente**: Outfit (Google Fonts)

## Paleta de Colores
- Primary: `#105D77` (azul petróleo)
- Endo Yellow: `#FFC107` (amarillo awareness)
- Success: `#2A9D8F` (verde teal)
- Accent: `#E76F51` (coral)
- Secondary: `#F4A261` (naranja suave)

## Arquitectura / Páginas
| Ruta | Componente | Estado |
|------|-----------|--------|
| `/` | Home.tsx | ✅ Mejorado |
| `/questionnaire` | Questionnaire.tsx | ✅ Mejorado |
| `/register` | Register.tsx | Sin cambios |
| `/login` | Login.tsx | Sin cambios |
| `/results` | Results.tsx (protegida) | Sin cambios |
| `/portal` | Portal.tsx (protegida) | Sin cambios |

## Lo Implementado

### Sesión 1 - Mejora de Home + Cuestionario (2026-03-04)

#### Home.tsx — Reescritura completa
- **Hero split layout**: texto izquierda, imagen (foto mujer real Unsplash) derecha
- **Floating cards**: tarjetas flotantes glassmorphism sobre la imagen ("Tu dolor es real", "190M mujeres")
- **Badge animado**: con punto pulsante amarillo
- **Animaciones staggered**: texto del hero aparece en secuencia con Framer Motion
- **Trust badges**: "Gratuito / Resultado inmediato / Basado en evidencia"
- **Background blobs**: elementos decorativos animados en hero
- **Stats section**: 3 tarjetas (190M / 7-12 / 70%) con animación `scaleIn` al hacer scroll
- **Pain types**: 3 cards con `border-top` de colores y `staggerContainer` al scroll
- **Pillars section**: layout 2 columnas - imagen de bienestar (bosque) + lista de pilares con hover slide
- **How it works**: 3 steps con flechas animadas
- **CTA section**: gradient card con glows decorativos

#### Questionnaire.tsx — Mejorado
- **AnimatePresence mode="wait"**: transición slide entre pasos (derecha→izquierda en avance, inverso al retroceder)
- **Progress dots**: 7 emojis de pasos, activo=amarillo, completado=verde ✓
- **Progress bar**: gradiente azul→amarillo con animación suave
- **Radio/Checkbox cards**: micro-animaciones con `whileHover` y `whileTap`
- **Goal grid**: layout 2 columnas con checkmark animado al seleccionar
- **Sliders de severidad**: con valor numérico grande y color por área

#### Setup
- Framer Motion instalado via npm
- `/app/frontend/package.json` creado para compatibilidad con supervisor

## Imágenes Usadas
- **Hero**: Mujer latina con luz dorada (Unsplash - golden hour portrait)
- **Pillars/Wellbeing**: Mujer meditando en bosque (Unsplash)

## Backlog / Próximas Iteraciones
### P0 (Crítico)
- [ ] Flujo completo register → login → ver resultados → portal

### P1 (Alta prioridad)
- [ ] Mejorar Register.tsx y Login.tsx con mismas animaciones
- [ ] Results.tsx: animación de barras de fenotipo al cargar
- [ ] Portal.tsx: animaciones de entrada para pillar cards
- [ ] Reemplazar date input nativo en cuestionario paso 3 con styled picker

### P2 (Backlog)
- [ ] Añadir imágenes a Results.tsx según fenotipo dominante
- [ ] Micro-animaciones en Portal (checkboxes de hábitos)
- [ ] Dark mode
- [ ] Accessibility: ARIA labels completos
- [ ] SEO: meta tags y OG tags

## Arquitectura de Contexto
- `AuthContext`: Maneja user, isAuthenticated, questionnaireAnswers, phenotypeResult
- Todo el estado de cuestionario es client-side (sin backend)
- `phenotypeAlgorithm.ts`: Calcula fenotipo dominante (nociceptivo/neuropático/nociplástico/mixto) basado en características de dolor y severidad
