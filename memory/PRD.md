# PRD — Saude Clínica de la Mujer

## Descripción del Proyecto
Plataforma web de salud femenina especializada en endometriosis. Permite a las pacientes evaluar su tipo de dolor (fenotipo), recibir resultados personalizados y acceder a un portal de bienestar basado en 5 pilares de salud.

## Stack Tecnológico
### Frontend
- **Framework**: Vite + React 19 + TypeScript
- **Routing**: React Router DOM v7
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Gráficos**: Recharts (sparklines para historial de síntomas)
- **Estilos**: CSS Modules + variables CSS personalizadas
- **Iconos**: Lucide React
- **Fuente**: Outfit (Google Fonts)

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Base de Datos**: MongoDB (motor async driver)
- **Autenticación**: JWT (PyJWT)
- **Validación**: Pydantic v2

## Paleta de Colores
- Primary: `#105D77` (azul petróleo)
- Endo Yellow: `#FFC107` (amarillo awareness)
- Success: `#2A9D8F` (verde teal)
- Accent: `#E76F51` (coral)
- Secondary: `#F4A261` (naranja suave)

## Arquitectura / Páginas
| Ruta | Componente | Estado |
|------|-----------|--------|
| `/` | Home.tsx | ✅ Implementado |
| `/questionnaire` | Questionnaire.tsx | ✅ Implementado |
| `/register` | Register.tsx | ✅ Implementado |
| `/login` | Login.tsx | ✅ Implementado |
| `/results` | Results.tsx (protegida) | ✅ Implementado |
| `/portal` | Portal.tsx (protegida) | ✅ Implementado |

## API Endpoints
| Endpoint | Método | Descripción | Auth |
|----------|--------|-------------|------|
| `/api/health` | GET | Health check | No |
| `/api/auth/register` | POST | Registro de usuario | No |
| `/api/auth/login` | POST | Login de usuario | No |
| `/api/auth/me` | GET | Obtener usuario actual | Sí |
| `/api/questionnaire` | POST | Guardar cuestionario | Sí |
| `/api/questionnaire/results` | GET | Obtener último resultado | Sí |
| `/api/questionnaire/history` | GET | Historial de cuestionarios | Sí |
| `/api/symptoms` | POST | Registrar síntoma | Sí |
| `/api/symptoms` | GET | Listar síntomas | Sí |
| `/api/symptoms/{date}` | GET | Síntoma por fecha | Sí |
| `/api/symptoms/{date}` | DELETE | Eliminar síntoma | Sí |

## Modelos de Base de Datos (MongoDB)

### Users Collection
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "password_hash": "sha256",
  "birth_date": "YYYY-MM-DD",
  "created_at": "datetime",
  "phenotype_result": { ... }
}
```

### Symptoms Collection
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "date": "YYYY-MM-DD",
  "pain": 0-10,
  "energy": 0-10,
  "mood": "good|neutral|bad",
  "notes": "string",
  "created_at": "datetime"
}
```

### Questionnaires Collection
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "answers": { ... },
  "phenotype_result": { ... },
  "created_at": "datetime"
}
```

## Lo Implementado

### Sesión 1 - Mejora de UI/UX Frontend
- Hero split layout con animaciones Framer Motion
- Cuestionario de 7 pasos con transiciones
- Dark mode con ThemeContext
- DatePicker personalizado
- Testimonios y SEO meta tags

### Sesión 2 - Gráfico Sparkline + Backend (2026-03-08)
- **SymptomChart.tsx**: Gráfico de líneas con recharts mostrando:
  - Historial de dolor y energía de 7 días
  - Análisis de tendencias (mejorando/empeorando/estable)
  - Sincronización con backend cuando autenticado

- **Backend FastAPI**:
  - Autenticación JWT completa (registro, login, me)
  - CRUD de síntomas con persistencia MongoDB
  - Guardado de cuestionarios y resultados
  - Modelos Pydantic para validación

- **Integración Frontend-Backend**:
  - AuthContext refactorizado para usar API real
  - DiarioModal guarda en localStorage + backend
  - SymptomChart obtiene datos de backend si autenticado

### Sesión 3 - Mejoras Login/Register + Sync (2026-03-08)
- **Estado de carga (isLoading)**: Login y Register muestran spinner mientras verifican sesión
- **Sincronización de síntomas**: Al hacer login, los síntomas guardados en localStorage se sincronizan automáticamente al backend
- **Redirección automática**: Usuarios autenticados son redirigidos automáticamente al portal

## Testing

### Backend Tests (30 passed)
- `/app/backend/tests/test_auth.py`
- `/app/backend/tests/test_symptoms.py`
- `/app/backend/tests/test_questionnaire.py`

### Frontend E2E Tests (24 passed)
- `/app/tests/e2e/core-flows.spec.ts`
- `/app/tests/e2e/auth-flows.spec.ts`
- `/app/tests/e2e/questionnaire-flow.spec.ts`
- `/app/tests/e2e/symptoms-sync.spec.ts`

**Total: 54 tests - 100% passed**

## Backlog / Próximas Iteraciones

### Completado ✅
- [x] Login/Register con estado de carga
- [x] Sincronización de síntomas localStorage → backend

### Pendiente (P1)
- [ ] Mejorar manejo de errores en formularios con toast notifications
- [ ] Indicador visual de sincronización en progreso

### Futuras (P2)
- [ ] Gamificación: insignias y rachas por completar hábitos
- [ ] Contenido educativo sobre endometriosis
- [ ] Comunidad / Foro para usuarias
- [ ] Integración con telemedicina real
- [ ] Notificaciones push para recordar diario de síntomas

## Arquitectura de Contexto React
- `AuthContext`: user, isAuthenticated, isLoading, questionnaireAnswers, phenotypeResult
- `ThemeContext`: Modo claro/oscuro
- API URL configurable via VITE_API_URL

## Imágenes Usadas
- Hero: Mujer latina con luz dorada (Unsplash)
- Pillars: Mujer meditando en bosque (Unsplash)
- Phenotypes: Ilustraciones específicas por tipo de dolor
