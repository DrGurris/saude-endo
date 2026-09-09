import { z } from 'zod'

export const threadSchema = z.object({
  title: z.string().min(5, 'El titulo debe tener al menos 5 caracteres').max(200, 'Maximo 200 caracteres'),
  body: z.string().min(10, 'El contenido debe tener al menos 10 caracteres').max(5000, 'Maximo 5000 caracteres'),
  category: z.enum(['pain', 'energy', 'nutrition', 'hormones', 'wellbeing', 'general'], {
    message: 'Selecciona una categoria',
  }),
  isAnonymous: z.boolean(),
})

export const replySchema = z.object({
  body: z.string().min(3, 'La respuesta debe tener al menos 3 caracteres').max(3000, 'Maximo 3000 caracteres'),
  isAnonymous: z.boolean(),
})

export const reportSchema = z.object({
  reason: z.string().min(10, 'Describe la razon con al menos 10 caracteres').max(500, 'Maximo 500 caracteres'),
})

export type ThreadFormData = z.infer<typeof threadSchema>
export type ReplyFormData = z.infer<typeof replySchema>
export type ReportFormData = z.infer<typeof reportSchema>
