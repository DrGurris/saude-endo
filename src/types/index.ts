export type DiagnosisOption = 'confirmed' | 'suspected' | 'adenomyosis' | 'unsure'

export type HormonalStatus =
  | 'hormonal_with_period'
  | 'hormonal_no_period'
  | 'natural_period'
  | 'no_period'
  | 'unsure'

export type PainCharacteristic =
  | 'cramps_localized'
  | 'worse_with_menstruation'
  | 'tenderness_lower_abdomen'
  | 'burning_sensation'
  | 'electric_shocks'
  | 'shooting_pain_radiating'
  | 'allodynia'
  | 'diffuse_pain'
  | 'extreme_fatigue'
  | 'sleep_concentration_problems'
  | 'sensitivity_light_sound_touch'
  | 'disproportionate_pain'

export type GoalOption =
  | 'reduce_pain'
  | 'improve_energy'
  | 'control_belly'
  | 'balance_hormones'
  | 'improve_fertility'
  | 'general_wellbeing'

export type CommitmentLevel = 'very_committed' | 'willing_to_try' | 'exploring'

export type PhenotypeType = 'nociceptive' | 'neuropathic' | 'nociplastic' | 'mixed'

export interface PhenotypeScores {
  nociceptive: number
  neuropathic: number
  nociplastic: number
}

export interface SeverityScores {
  pelvic: number
  nervous: number
  fatigue: number
  digestive: number
  mood: number
}

export interface QuestionnaireAnswers {
  q1Diagnosis: DiagnosisOption | null
  q2HormonalStatus: HormonalStatus | null
  q3LastPeriod: string | null
  q4PainCharacteristics: PainCharacteristic[]
  q5Severity: SeverityScores
  q6Goal: GoalOption | null
  q7Commitment: CommitmentLevel | null
}

export interface PhenotypeResult {
  dominantPhenotype: PhenotypeType
  scores: PhenotypeScores
  goal: GoalOption
  commitment: CommitmentLevel
  completedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  birthDate: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  questionnaireAnswers: QuestionnaireAnswers | null
  phenotypeResult: PhenotypeResult | null
}

export const EMPTY_QUESTIONNAIRE_ANSWERS: QuestionnaireAnswers = {
  q1Diagnosis: null,
  q2HormonalStatus: null,
  q3LastPeriod: null,
  q4PainCharacteristics: [],
  q5Severity: { pelvic: 0, nervous: 0, fatigue: 0, digestive: 0, mood: 0 },
  q6Goal: null,
  q7Commitment: null,
}

export const PAIN_CHARACTERISTIC_SCORES: Record<
  PainCharacteristic,
  { nociceptive: number; neuropathic: number; nociplastic: number }
> = {
  cramps_localized: { nociceptive: 3, neuropathic: 0, nociplastic: 0 },
  worse_with_menstruation: { nociceptive: 2, neuropathic: 0, nociplastic: 0 },
  tenderness_lower_abdomen: { nociceptive: 1, neuropathic: 0, nociplastic: 0 },
  burning_sensation: { nociceptive: 0, neuropathic: 3, nociplastic: 0 },
  electric_shocks: { nociceptive: 0, neuropathic: 3, nociplastic: 0 },
  shooting_pain_radiating: { nociceptive: 0, neuropathic: 2, nociplastic: 0 },
  allodynia: { nociceptive: 0, neuropathic: 2, nociplastic: 0 },
  diffuse_pain: { nociceptive: 0, neuropathic: 0, nociplastic: 3 },
  extreme_fatigue: { nociceptive: 0, neuropathic: 0, nociplastic: 2 },
  sleep_concentration_problems: { nociceptive: 0, neuropathic: 0, nociplastic: 2 },
  sensitivity_light_sound_touch: { nociceptive: 0, neuropathic: 0, nociplastic: 2 },
  disproportionate_pain: { nociceptive: 0, neuropathic: 0, nociplastic: 1 },
}

export const PHENOTYPE_LABELS: Record<PhenotypeType, string> = {
  nociceptive: 'Nociceptivo',
  neuropathic: 'Neuropático',
  nociplastic: 'Nociplástico',
  mixed: 'Mixto',
}

export const PHENOTYPE_DESCRIPTIONS: Record<PhenotypeType, { description: string; action: string; color: string }> = {
  nociceptive: {
    description: 'Tu dolor sugiere estar directamente relacionado con la inflamación y posibles lesiones de endometriosis superficial o profunda.',
    action: 'Recomendamos un ultrasonido especializado para mapeo de endometriosis y discutir opciones antiinflamatorias.',
    color: 'var(--color-info)',
  },
  neuropathic: {
    description: 'Las características de ardor o calambres eléctricos sugieren que los nervios pélvicos están siendo afectados o sensibilizados.',
    action: 'Es vital una evaluación clínica para evitar cirugías innecesarias y enfocar el tratamiento en neuromoduladores médicos o físicos.',
    color: 'var(--color-accent)',
  },
  nociplastic: {
    description: 'La fatiga extrema y el dolor generalizado indican que tu sistema nervioso central está amplificando las señales de dolor.',
    action: 'Un enfoque puramente quirúrgico rara vez es suficiente. Sugerimos un manejo integral con enfoque multidisciplinario (mente-cuerpo).',
    color: 'var(--color-success)',
  },
  mixed: {
    description: 'Tus respuestas indican un perfil mixto, compartiendo características inflamatorias y de sensibilización nerviosa.',
    action: 'Requieres una valoración médica minuciosa para armar un plan escalonado que aborde cada componente del dolor.',
    color: 'var(--color-primary)',
  },
}

export const GOAL_LABELS: Record<GoalOption, string> = {
  reduce_pain: 'Reducir mi dolor',
  improve_energy: 'Mejorar mi energía y reducir fatiga',
  control_belly: 'Controlar mi endo belly / problemas digestivos',
  balance_hormones: 'Equilibrar mis hormonas',
  improve_fertility: 'Mejorar mi fertilidad',
  general_wellbeing: 'Bienestar general',
}

export type PillarId = 'pain' | 'energy' | 'nutrition' | 'hormones' | 'wellbeing'

export const GOAL_PILLAR_MAP: Record<GoalOption, { primary: PillarId; secondary: PillarId }> = {
  reduce_pain: { primary: 'pain', secondary: 'nutrition' },
  improve_energy: { primary: 'energy', secondary: 'wellbeing' },
  control_belly: { primary: 'nutrition', secondary: 'energy' },
  balance_hormones: { primary: 'hormones', secondary: 'pain' },
  improve_fertility: { primary: 'hormones', secondary: 'nutrition' },
  general_wellbeing: { primary: 'wellbeing', secondary: 'energy' },
}
