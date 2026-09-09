import { describe, it, expect } from 'vitest'
import { calculatePhenotype } from './phenotypeAlgorithm'
import type { QuestionnaireAnswers, PainCharacteristic } from '../types'

function makeAnswers(overrides: Partial<QuestionnaireAnswers> = {}): QuestionnaireAnswers {
  return {
    q1Diagnosis: 'confirmed',
    q2HormonalStatus: 'natural_period',
    q3LastPeriod: '2026-02-01',
    q4PainCharacteristics: ['cramps_localized', 'worse_with_menstruation'],
    q5Severity: { pelvic: 5, nervous: 3, fatigue: 2, digestive: 0, mood: 0 },
    q6Goal: 'reduce_pain',
    q7Commitment: 'very_committed',
    ...overrides,
  }
}

describe('calculatePhenotype', () => {
  it('throws when questionnaire is incomplete (no goal)', () => {
    const answers = makeAnswers({ q6Goal: null })
    expect(() => calculatePhenotype(answers)).toThrow('completarse')
  })

  it('throws when questionnaire is incomplete (no commitment)', () => {
    const answers = makeAnswers({ q7Commitment: null })
    expect(() => calculatePhenotype(answers)).toThrow('completarse')
  })

  it('classifies nociceptive-dominant profile', () => {
    const answers = makeAnswers({
      q4PainCharacteristics: ['cramps_localized', 'worse_with_menstruation', 'tenderness_lower_abdomen'],
      q5Severity: { pelvic: 8, nervous: 1, fatigue: 1, digestive: 0, mood: 0 },
    })
    const result = calculatePhenotype(answers)
    expect(result.dominantPhenotype).toBe('nociceptive')
    expect(result.scores.nociceptive).toBeGreaterThan(60)
  })

  it('classifies neuropathic-dominant profile', () => {
    const answers = makeAnswers({
      q4PainCharacteristics: ['burning_sensation', 'electric_shocks', 'shooting_pain_radiating', 'allodynia'],
      q5Severity: { pelvic: 1, nervous: 9, fatigue: 1, digestive: 0, mood: 0 },
    })
    const result = calculatePhenotype(answers)
    expect(result.dominantPhenotype).toBe('neuropathic')
    expect(result.scores.neuropathic).toBeGreaterThan(60)
  })

  it('classifies nociplastic-dominant profile', () => {
    const answers = makeAnswers({
      q4PainCharacteristics: ['diffuse_pain', 'extreme_fatigue', 'sleep_concentration_problems', 'sensitivity_light_sound_touch', 'disproportionate_pain'],
      q5Severity: { pelvic: 1, nervous: 1, fatigue: 9, digestive: 0, mood: 0 },
    })
    const result = calculatePhenotype(answers)
    expect(result.dominantPhenotype).toBe('nociplastic')
    expect(result.scores.nociplastic).toBeGreaterThan(60)
  })

  it('classifies mixed profile when two scores > 40%', () => {
    const answers = makeAnswers({
      q4PainCharacteristics: [
        'cramps_localized', 'worse_with_menstruation',
        'burning_sensation', 'electric_shocks',
      ],
      q5Severity: { pelvic: 5, nervous: 5, fatigue: 1, digestive: 0, mood: 0 },
    })
    const result = calculatePhenotype(answers)
    expect(result.dominantPhenotype).toBe('mixed')
  })

  it('scores always sum to 100%', () => {
    const characteristics: PainCharacteristic[] = [
      'cramps_localized', 'burning_sensation', 'diffuse_pain',
    ]
    const answers = makeAnswers({
      q4PainCharacteristics: characteristics,
      q5Severity: { pelvic: 3, nervous: 4, fatigue: 5, digestive: 0, mood: 0 },
    })
    const result = calculatePhenotype(answers)
    const total = result.scores.nociceptive + result.scores.neuropathic + result.scores.nociplastic
    expect(total).toBe(100)
  })

  it('returns equal distribution when no characteristics selected', () => {
    const answers = makeAnswers({
      q4PainCharacteristics: [],
      q5Severity: { pelvic: 0, nervous: 0, fatigue: 0, digestive: 0, mood: 0 },
    })
    const result = calculatePhenotype(answers)
    // 33 + 33 + 34 = 100
    expect(result.scores.nociceptive + result.scores.neuropathic + result.scores.nociplastic).toBe(100)
  })

  it('preserves goal and commitment in result', () => {
    const answers = makeAnswers({ q6Goal: 'improve_energy', q7Commitment: 'exploring' })
    const result = calculatePhenotype(answers)
    expect(result.goal).toBe('improve_energy')
    expect(result.commitment).toBe('exploring')
  })

  it('includes completedAt timestamp', () => {
    const before = new Date().toISOString()
    const result = calculatePhenotype(makeAnswers())
    const after = new Date().toISOString()
    expect(result.completedAt >= before).toBe(true)
    expect(result.completedAt <= after).toBe(true)
  })

  it('severity weights amplify the dominant dimension', () => {
    const base = makeAnswers({
      q4PainCharacteristics: ['cramps_localized', 'burning_sensation', 'diffuse_pain'],
      q5Severity: { pelvic: 0, nervous: 0, fatigue: 0, digestive: 0, mood: 0 },
    })
    const weighted = makeAnswers({
      q4PainCharacteristics: ['cramps_localized', 'burning_sensation', 'diffuse_pain'],
      q5Severity: { pelvic: 10, nervous: 0, fatigue: 0, digestive: 0, mood: 0 },
    })
    const baseResult = calculatePhenotype(base)
    const weightedResult = calculatePhenotype(weighted)
    expect(weightedResult.scores.nociceptive).toBeGreaterThan(baseResult.scores.nociceptive)
  })
})
