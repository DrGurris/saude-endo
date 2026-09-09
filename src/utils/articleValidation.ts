import { z } from 'zod'

const pillarIds = ['pain', 'energy', 'nutrition', 'hormones', 'wellbeing'] as const
const phenotypeTypes = ['nociceptive', 'neuropathic', 'nociplastic', 'mixed'] as const
const goalOptions = ['reduce_pain', 'improve_energy', 'control_belly', 'balance_hormones', 'improve_fertility', 'general_wellbeing'] as const
const articleStatuses = ['draft', 'published', 'archived'] as const

export const articleSchema = z.object({
  title: z.string().min(5, 'El titulo debe tener al menos 5 caracteres').max(200),
  pillarId: z.enum(pillarIds, { message: 'Selecciona un pilar valido' }),
  summary: z.string().min(20, 'El resumen debe tener al menos 20 caracteres').max(500),
  contentMarkdown: z.string().min(100, 'El contenido debe tener al menos 100 caracteres'),
  citations: z.array(z.string().min(1)).min(1, 'Agrega al menos una cita'),
  phenotypeRelevance: z.array(z.enum(phenotypeTypes)).min(1, 'Selecciona al menos un fenotipo'),
  goalRelevance: z.array(z.enum(goalOptions)),
  readTimeMinutes: z.number().int().min(1).max(60),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
  status: z.enum(articleStatuses).default('draft'),
})

export type ArticleFormData = z.infer<typeof articleSchema>
