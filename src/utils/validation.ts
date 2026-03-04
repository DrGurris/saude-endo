import { z } from 'zod'

const diagnosisOptions = ['confirmed', 'suspected', 'adenomyosis', 'unsure'] as const
const hormonalStatuses = ['hormonal_with_period', 'hormonal_no_period', 'natural_period', 'no_period', 'unsure'] as const
const painCharacteristics = [
  'cramps_localized', 'worse_with_menstruation', 'tenderness_lower_abdomen',
  'burning_sensation', 'electric_shocks', 'shooting_pain_radiating', 'allodynia',
  'diffuse_pain', 'extreme_fatigue', 'sleep_concentration_problems',
  'sensitivity_light_sound_touch', 'disproportionate_pain',
] as const
const goalOptions = ['reduce_pain', 'improve_energy', 'control_belly', 'balance_hormones', 'improve_fertility', 'general_wellbeing'] as const
const commitmentLevels = ['very_committed', 'willing_to_try', 'exploring'] as const

export const q1Schema = z.object({
  q1Diagnosis: z.enum(diagnosisOptions, { message: 'Selecciona una opción' }),
})

export const q2Schema = z.object({
  q2HormonalStatus: z.enum(hormonalStatuses, { message: 'Selecciona una opción' }),
})

export const q3Schema = z.object({
  q3LastPeriod: z.string().min(1, 'Selecciona una fecha'),
})

export const q4Schema = z.object({
  q4PainCharacteristics: z.array(z.enum(painCharacteristics)).min(1, 'Selecciona al menos una opción'),
})

export const q5Schema = z.object({
  q5Severity: z.object({
    pelvic: z.number().min(0).max(10),
    nervous: z.number().min(0).max(10),
    fatigue: z.number().min(0).max(10),
    digestive: z.number().min(0).max(10),
    mood: z.number().min(0).max(10),
  }),
})

export const q6Schema = z.object({
  q6Goal: z.enum(goalOptions, { message: 'Selecciona un objetivo' }),
})

export const q7Schema = z.object({
  q7Commitment: z.enum(commitmentLevels, { message: 'Selecciona una opción' }),
})

export const stepSchemas = [q1Schema, q2Schema, q3Schema, q4Schema, q5Schema, q6Schema, q7Schema] as const

export const emailSchema = z
  .string()
  .min(1, 'El correo electrónico es requerido')
  .email('Correo electrónico inválido')

export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña no puede exceder 128 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial')

export const registerSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'El nombre no puede exceder 100 caracteres'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
    birthDate: z
      .string()
      .min(1, 'La fecha de nacimiento es requerida')
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
