import type {
  PhenotypeType,
  PhenotypeScores,
  PhenotypeResult,
  QuestionnaireAnswers,
  PainCharacteristic,
} from '../types'
import { PAIN_CHARACTERISTIC_SCORES } from '../types'

function sumRawScores(characteristics: PainCharacteristic[]): PhenotypeScores {
  return characteristics.reduce(
    (acc, characteristic) => {
      const points = PAIN_CHARACTERISTIC_SCORES[characteristic]
      return {
        nociceptive: acc.nociceptive + points.nociceptive,
        neuropathic: acc.neuropathic + points.neuropathic,
        nociplastic: acc.nociplastic + points.nociplastic,
      }
    },
    { nociceptive: 0, neuropathic: 0, nociplastic: 0 }
  )
}

function applyWeights(
  raw: PhenotypeScores,
  pelvicSeverity: number,
  nervousSeverity: number,
  fatigueSeverity: number
): PhenotypeScores {
  return {
    nociceptive: raw.nociceptive * (1 + pelvicSeverity / 10),
    neuropathic: raw.neuropathic * (1 + nervousSeverity / 10),
    nociplastic: raw.nociplastic * (1 + fatigueSeverity / 10),
  }
}

function normalizeToPercentages(weighted: PhenotypeScores): PhenotypeScores {
  const total = weighted.nociceptive + weighted.neuropathic + weighted.nociplastic

  if (total === 0) {
    return { nociceptive: 33, neuropathic: 33, nociplastic: 34 }
  }

  const raw = {
    nociceptive: (weighted.nociceptive / total) * 100,
    neuropathic: (weighted.neuropathic / total) * 100,
    nociplastic: (weighted.nociplastic / total) * 100,
  }

  const floored = {
    nociceptive: Math.floor(raw.nociceptive),
    neuropathic: Math.floor(raw.neuropathic),
    nociplastic: Math.floor(raw.nociplastic),
  }

  let remainder = 100 - floored.nociceptive - floored.neuropathic - floored.nociplastic

  const keys: (keyof PhenotypeScores)[] = ['nociceptive', 'neuropathic', 'nociplastic']
  const sorted = [...keys].sort((a, b) => (raw[b] - floored[b]) - (raw[a] - floored[a]))

  const result = { ...floored }
  for (const key of sorted) {
    if (remainder <= 0) break
    result[key] = result[key] + 1
    remainder--
  }

  return result
}

function classifyPhenotype(scores: PhenotypeScores): PhenotypeType {
  const entries: [PhenotypeType, number][] = [
    ['nociceptive', scores.nociceptive],
    ['neuropathic', scores.neuropathic],
    ['nociplastic', scores.nociplastic],
  ]

  const sorted = [...entries].sort((a, b) => b[1] - a[1])

  if (sorted[0][1] > 60) {
    return sorted[0][0]
  }

  const above40 = entries.filter(([, score]) => score > 40)
  if (above40.length >= 2) {
    return 'mixed'
  }

  return sorted[0][0]
}

export function calculatePhenotype(answers: QuestionnaireAnswers): PhenotypeResult {
  if (!answers.q6Goal || !answers.q7Commitment) {
    throw new Error('El cuestionario debe completarse antes de calcular el fenotipo')
  }

  const raw = sumRawScores(answers.q4PainCharacteristics)

  const weighted = applyWeights(
    raw,
    answers.q5Severity.pelvic,
    answers.q5Severity.nervous,
    answers.q5Severity.fatigue
  )

  const scores = normalizeToPercentages(weighted)
  const dominantPhenotype = classifyPhenotype(scores)

  return {
    dominantPhenotype,
    scores,
    goal: answers.q6Goal,
    commitment: answers.q7Commitment,
    completedAt: new Date().toISOString(),
  }
}
