# Saude Clinica de la Mujer — Web App

Plataforma web de educacion y manejo de endometriosis basada en evidencia cientifica.

## Stack Tecnico

- **Framework**: React 19 + React Router 7 (SPA)
- **Build**: Vite 7 + TypeScript 5.9
- **Estilos**: CSS Modules + CSS custom properties (variables)
- **Animaciones**: Framer Motion
- **Validacion**: Zod 4 + react-hook-form + @hookform/resolvers
- **Iconos**: Lucide React
- **Graficos**: Recharts 3
- **Fuente**: Outfit (Google Fonts)

## Estructura del Proyecto

```
src/
├── components/           # Componentes compartidos
│   ├── library/          # ArticleCard, ArticleModal, PillarFilter, PersonalizationBanner
│   ├── community/        # ThreadCard, ReplyCard, CreateThreadModal, etc.
│   ├── admin/            # DataTable, StatCard, MarkdownEditor, etc.
│   ├── Layout.tsx        # Header/nav/footer con Outlet
│   ├── ProtectedRoute.tsx
│   ├── RoleRoute.tsx     # Guard por role (user/moderator/admin)
│   ├── AdminLayout.tsx   # Sidebar admin + Outlet
│   ├── Gamification.tsx  # Streaks + 10 badges
│   └── ...
├── context/
│   ├── AuthContext.tsx    # Auth state + role + questionnaire
│   ├── ThemeContext.tsx   # Dark/light mode
│   └── CommunityContext.tsx  # Forum state + actions
├── data/
│   ├── articles/         # 5 archivos por pilar (24 articulos)
│   ├── articles.ts       # Barrel: ARTICLES[]
│   └── pillars.ts        # 5 pilares + helpers
├── hooks/
│   └── useArticles.ts    # Hook: loading/error/articles con fallback
├── pages/
│   ├── admin/            # 7 paginas admin
│   ├── Community.tsx     # Listado de hilos
│   ├── CommunityThread.tsx # Detalle hilo + replies
│   ├── Library.tsx       # Biblioteca de articulos
│   └── ...               # Home, Questionnaire, Register, Login, Results, Portal
├── services/
│   ├── api.ts            # HTTP client base con auth headers
│   ├── articleService.ts # CRUD articulos (API o fallback estatico)
│   ├── communityService.ts  # CRUD threads/replies/supports/reports
│   ├── adminService.ts   # Operaciones admin (users, analytics)
│   ├── gamificationService.ts  # Logica badges extraida
│   ├── mockArticleStore.ts    # localStorage mock para articulos
│   ├── mockCommunityStore.ts  # localStorage mock + seed data
│   └── mockAdminData.ts       # Seed data admin
├── types/
│   └── index.ts          # Todos los tipos (auth, articles, forum, admin)
├── utils/
│   ├── articleHelpers.ts     # Filtrado, recomendaciones, bookmarks, sharing
│   ├── articleValidation.ts  # Zod schema articulos
│   ├── communityValidation.ts # Zod schemas foro
│   ├── markdownRenderer.ts   # MD -> React
│   ├── phenotypeAlgorithm.ts # Scoring fenotipo
│   └── validation.ts         # Schemas cuestionario + auth
├── App.tsx               # Rutas + providers
├── index.css             # Variables CSS + dark mode + animaciones
└── main.tsx              # React root
```

## Convenciones

- **CSS**: Variables en `:root` (`--color-*`, `--shadow-*`, `--radius-*`, `--transition-*`)
- **Dark mode**: `[data-theme="dark"]` overrides en index.css
- **Inmutabilidad**: Spread objects, nunca mutar estado directamente
- **Archivos**: <800 lineas; extraer componentes si crece
- **Idioma**: Espanol latinoamericano (UI y contenido)
- **Tipos**: Todos en `src/types/index.ts`; tipos locales solo si son de un componente
- **Imports**: Paths relativos, barrel files para data/articles
- **Validacion**: Zod schemas para toda entrada de usuario
- **Animaciones**: Framer Motion (stagger 0.04s, spring transitions)
- **Roles**: `UserRole = 'user' | 'moderator' | 'admin'`
- **API mock**: localStorage simula backend; facade chequea API real primero

## Etapas Completadas

### Fase 0 — Imagenes AI en Home
- 12 imagenes (pilares, onboarding, habitos) en `public/images/`
- 3 secciones del Home actualizadas

### Fase 1 — Data Layer
- Types alineados con app movil (PainCharacteristic, GoalOption, PhenotypeType)
- 5 pilares en `pillars.ts` con colores CSS variables
- markdownRenderer.ts (MD ligero -> React)
- articleHelpers.ts (filtrado, recomendaciones, bookmarks, progreso lectura, sharing)

### Fase 1.5 — Fix UX Modal
- Modal centrado con `position: fixed` + flexbox
- Body scroll lock, aria-labelledby

### Fase 2 — Componentes Library
- PillarFilter (tabs por pilar)
- ArticleCard (titulo, summary, read time, bookmark, progress bar)
- ArticleModal (markdown render, citas, share, scroll progress)
- PersonalizationBanner (CTA para no autenticados, recomendaciones para autenticados)

### Fase 3 — Library Page Rewrite
- 852 -> 250 lineas via descomposicion en 4 componentes

### Fase 4 — Contenido Evidence-Based
- 24 articulos expandidos (~700 palabras promedio, 3-4 citas cada uno)
- 7 articulos destacados (featured) distribuidos en 5 pilares

### Fase 5 — Personalizacion
- Bookmarks en localStorage
- Progreso de lectura (scroll tracking -> localStorage)
- Recomendaciones por fenotipo + goal (scoring ponderado)

### Fase 5.5 — Split Articulos + Fix Share
- 5 archivos por pilar en `src/data/articles/`
- Clipboard fallback en desktop (Web Share API solo en mobile)

### Fase 6 — Comunidad/Foro
- Tipos: ForumThread, ForumReply, ForumReport, UserProfile, CommunityBadge
- communityService + mockCommunityStore (15 threads seed)
- CommunityContext (estado, filtros, acciones CRUD)
- 10 componentes: ThreadCard, ThreadList, CreateThreadModal, ReplyForm, ReplyCard, etc.
- 2 paginas: /community (listado), /community/:threadId (detalle)
- Gamificacion expandida: 10 badges (6 originales + 4 comunitarios)
- gamificationService.ts (logica extraida + badges comunitarios)

### Fase 7 — Dashboard de Administracion
- AdminLayout (sidebar + header + Outlet)
- RoleRoute guard (requiere role especifico)
- 6 componentes admin: DataTable, StatCard, ActionModal, SearchInput, StatusBadge, MarkdownEditor
- 7 paginas: Dashboard, UserManagement, ContentModeration, ArticleManagement, ArticleEditor, Analytics, Settings
- adminService + mockAdminData (20 users seed, analytics mock)
- Bootstrap: primer usuario registrado obtiene role admin

### Fase 8 — API para Articulos Dinamicos
- articleService.ts (facade: API disponible -> fetch, sino -> fallback estatico)
- mockArticleStore.ts (localStorage CRUD)
- useArticles.ts hook (loading/error/refetch, 5 min cache)
- articleValidation.ts (Zod schema ManagedArticle)
- Library.tsx refactorizado con useArticles() en vez de import directo

### Fase 9 — Code Review, Tests, Optimizacion
- Code review: 3 CRITICAL, 16 HIGH, 7 MEDIUM issues corregidos
- Vitest + @testing-library/react configurado (jsdom, CSS modules, setup.ts)
- 8 suites, 85 tests (utils, services, componentes)
- Code splitting: React.lazy() + Suspense (main bundle 1162KB -> 422KB, -63%)
- Bug critico corregido: isApiAvailable() engañado por SPA fallback de Vite (Content-Type check)
- handleResponse() safe JSON parsing (try/catch)
- timeAgo.ts utilidad compartida (elimina 3 duplicaciones)
- Nested interactive elements fix (button inside Link)
- Admin self-protection (no puede demotarse/banearse)
- RoleRoute loading state (evita flash redirect)
- Framer Motion ease typing fix (as const en 7 archivos)
- Zod 4 boolean().default(false) fix para hookform resolvers

## Proximas Etapas

- **Backend real**: API REST para auth, articulos, foro, admin
- **Auth produccion**: bcrypt/argon2 server-side (actualmente SHA-256 client)
- **Mas tests**: Mas componentes y paginas para 80%+ cobertura
- **E2E tests**: Playwright para flujos criticos
- **Paginas legales**: Terminos y Privacidad (links placeholder en footer)
- **Booking**: Funcionalidad de citas (boton placeholder)
- **Citas academicas**: Verificacion via PubMed/CrossRef

## Archivos Clave

| Archivo | Proposito |
|---------|-----------|
| `src/types/index.ts` | Todos los tipos del proyecto |
| `src/context/AuthContext.tsx` | Auth + role + questionnaire state |
| `src/context/CommunityContext.tsx` | Forum state + CRUD actions |
| `src/services/api.ts` | HTTP client con auth headers |
| `src/services/articleService.ts` | CRUD articulos (API/fallback) |
| `src/services/communityService.ts` | CRUD foro |
| `src/services/adminService.ts` | Operaciones admin |
| `src/services/gamificationService.ts` | Logica de badges |
| `src/hooks/useArticles.ts` | Hook para articulos con cache |
| `src/utils/articleHelpers.ts` | Filtrado, recomendaciones, bookmarks |
| `src/utils/markdownRenderer.ts` | Markdown -> React |
| `src/data/articles.ts` | Barrel 24 articulos |
| `src/data/pillars.ts` | 5 pilares + colores |
| `src/App.tsx` | Rutas + providers |
| `src/index.css` | Variables CSS + dark mode |

## Comandos

```bash
npm run dev        # Dev server (Vite, puerto 5173)
npm run build      # Build produccion (tsc + vite build)
npx tsc --noEmit   # Type check sin emitir
npm test           # Vitest (85 tests)
npm run test:watch # Vitest watch mode
npm run test:coverage # Vitest con cobertura
```
