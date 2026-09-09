# Saude Web — Progress Tracker

## Resumen

| Metrica | Valor |
|---------|-------|
| **Fases completadas** | 0–9 (frontend completo) |
| **Tests** | 20 suites, 198 tests (Vitest) |
| **TypeScript** | 0 errores |
| **Bundle principal** | 422 KB (code splitting) |
| **Paginas** | 14 (Home, Library, Community×2, Admin×7, Questionnaire, Register, Login, Results, Portal, Terms, Privacy) |
| **Articulos** | 24 evidence-based (~700 palabras, 3-4 citas c/u) |
| **Componentes** | ~40 (library, community, admin, shared) |

---

## Fases Completadas

### Fase 0 — Imagenes AI en Home ✅
### Fase 1 — Data Layer (types, pillars, articles, helpers) ✅
### Fase 1.5 — Fix UX Modal ✅
### Fase 2 — Componentes Library ✅
### Fase 3 — Library Page Rewrite (852→250 lineas) ✅
### Fase 4 — Contenido Evidence-Based (24 articulos) ✅
### Fase 5 — Personalizacion (bookmarks, progreso, recomendaciones) ✅
### Fase 5.5 — Split Articulos + Fix Share ✅
### Fase 6 — Comunidad/Foro (15 threads, 10 componentes, 2 paginas) ✅
### Fase 7 — Dashboard Admin (7 paginas, 6 componentes, roles) ✅
### Fase 8 — API Articulos Dinamicos (facade, mock store, hook) ✅
### Fase 9 — Code Review, Tests, Optimizacion ✅

---

## Fase 10 — Cobertura de Tests

**Objetivo**: 80%+ coverage, tests para todos los componentes y paginas criticas.

| # | Tarea | Estado | Tests |
|---|-------|--------|-------|
| 10.1 | Tests de paginas: Community.tsx | ⬜ pendiente | — |
| 10.2 | Tests de paginas: CommunityThread.tsx | ⬜ pendiente | — |
| 10.3 | Tests de paginas: Library.tsx | ⬜ pendiente | — |
| 10.4 | Tests de componentes: ThreadCard, ThreadList | ✅ | 8 |
| 10.5 | Tests de componentes: ReplyCard, ReplyForm | ⬜ pendiente | — |
| 10.6 | Tests de componentes: CommunityFilters | ✅ | 5 |
| 10.7 | Tests de componentes: CreateThreadModal | ⬜ pendiente | — |
| 10.8 | Tests de componentes: StatCard, StatusBadge | ✅ | 9 |
| 10.9 | Tests de componentes: MarkdownEditor | ✅ | 8 |
| 10.10 | Tests de servicios: articleService (facade logic) | ✅ | 10 |
| 10.11 | Tests de servicios: communityService | ✅ | 13 |
| 10.12 | Tests de servicios: adminService | ✅ | 8 |
| 10.13 | Tests de hooks: useArticles | ⬜ pendiente | — |
| 10.14 | Tests de utils: markdownRenderer | ✅ | 13 |
| 10.15 | Tests de utils: phenotypeAlgorithm | ✅ | 11 |
| 10.16 | Tests de contextos: AuthContext | ⬜ pendiente | — |
| 10.17 | Tests de contextos: CommunityContext | ⬜ pendiente | — |
| 10.18 | Ejecutar coverage report y verificar 80%+ | ✅ | Lines: 80.11% |

---

## Fase 11 — E2E Tests (Playwright)

**Objetivo**: Flujos criticos de usuario verificados end-to-end.

| # | Tarea | Estado |
|---|-------|--------|
| 11.1 | Configurar Playwright (playwright.config.ts, scripts) | ⬜ pendiente |
| 11.2 | E2E: Home → navegar a Library → abrir articulo → cerrar | ⬜ pendiente |
| 11.3 | E2E: Home → Evaluacion → 7 pasos cuestionario | ⬜ pendiente |
| 11.4 | E2E: Community → ver hilos → entrar a hilo → ver replies | ⬜ pendiente |
| 11.5 | E2E: Dark mode toggle persiste entre paginas | ⬜ pendiente |
| 11.6 | E2E: Library → filtrar por pilar → buscar → bookmark | ⬜ pendiente |
| 11.7 | E2E: Mobile responsive (viewport 375px) | ⬜ pendiente |

---

## Fase 12 — Verificacion de Citas Academicas

**Objetivo**: Validar que las ~70 referencias bibliograficas en los 24 articulos existen y son correctas.

| # | Tarea | Estado |
|---|-------|--------|
| 12.1 | Extraer todas las citas de los 24 articulos | ⬜ pendiente |
| 12.2 | Verificar via PubMed (pubmed_search, pubmed_fetch) | ⬜ pendiente |
| 12.3 | Verificar via CrossRef (searchByTitle, getWorkByDOI) | ⬜ pendiente |
| 12.4 | Reemplazar citas incorrectas o fabricadas | ⬜ pendiente |
| 12.5 | Agregar DOIs donde falten | ⬜ pendiente |
| 12.6 | Documentar fuentes verificadas | ⬜ pendiente |

---

## Fase 13 — Paginas Legales

**Objetivo**: Terminos de servicio y politica de privacidad requeridos para produccion.

| # | Tarea | Estado |
|---|-------|--------|
| 13.1 | Crear pagina TermsOfService.tsx + ruta /terms | ✅ |
| 13.2 | Crear pagina PrivacyPolicy.tsx + ruta /privacy | ✅ |
| 13.3 | Actualizar links en footer (Layout.tsx) | ✅ |
| 13.4 | Agregar checkbox de aceptacion en Register.tsx | ✅ |

---

## Fase 14 — Backend API

**Objetivo**: Reemplazar localStorage/mocks con API real.

| # | Tarea | Estado |
|---|-------|--------|
| 14.1 | Elegir stack backend (FastAPI / Express / Hono) | ⬜ pendiente |
| 14.2 | Esquema DB (PostgreSQL): users, articles, threads, replies, reports | ⬜ pendiente |
| 14.3 | Auth endpoints: register, login, me, refresh token | ⬜ pendiente |
| 14.4 | Auth: bcrypt/argon2 password hashing | ⬜ pendiente |
| 14.5 | Articles CRUD endpoints | ⬜ pendiente |
| 14.6 | Community endpoints: threads, replies, supports, reports | ⬜ pendiente |
| 14.7 | Admin endpoints: users, analytics, settings, moderation | ⬜ pendiente |
| 14.8 | Conectar frontend (VITE_API_URL) y verificar facade | ⬜ pendiente |
| 14.9 | Seed data: migrar mock data a DB | ⬜ pendiente |
| 14.10 | Tests backend (pytest / vitest) | ⬜ pendiente |

---

## Fase 15 — Booking (Citas)

**Objetivo**: Funcionalidad de agendar citas medicas.

| # | Tarea | Estado |
|---|-------|--------|
| 15.1 | Definir integracion (Calendly embed / API custom) | ⬜ pendiente |
| 15.2 | Componente BookingModal (localStorage mock) | ✅ |
| 15.3 | Conectar boton "Agendar Cita" en Home, Results, Portal | ✅ |

---

## Fase 16 — Deploy + CI/CD

**Objetivo**: Pipeline automatizado y hosting de produccion.

| # | Tarea | Estado |
|---|-------|--------|
| 16.1 | GitHub Actions: lint + tsc + test + build | ⬜ pendiente |
| 16.2 | Deploy frontend (Vercel / Netlify) | ⬜ pendiente |
| 16.3 | Deploy backend (Railway / Render / VPS) | ⬜ pendiente |
| 16.4 | Variables de entorno staging/produccion | ⬜ pendiente |
| 16.5 | Dominio + SSL | ⬜ pendiente |

---

## Leyenda

| Icono | Significado |
|-------|-------------|
| ✅ | Completado |
| 🔄 | En progreso |
| ⬜ | Pendiente |
| ❌ | Bloqueado |
