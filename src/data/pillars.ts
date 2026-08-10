import type { Pillar, PillarId } from '../types'

export const PILLARS: Pillar[] = [
  {
    id: 'pain',
    label: 'Manejo del Dolor',
    subtitle: 'TENS, suelo pélvico, manejo farmacológico',
    color: 'var(--color-primary)',
    bgColor: 'rgba(16,93,119,0.1)',
    icon: 'Heart',
    iconImage: '/images/icons/pillar_pain.webp',
    image: '/images/pillars/pain_management.png',
  },
  {
    id: 'energy',
    label: 'Recupera tu Energía',
    subtitle: 'Higiene del sueño, suplementos, ejercicio',
    color: 'var(--color-success)',
    bgColor: 'rgba(42,157,143,0.1)',
    icon: 'BatteryCharging',
    iconImage: '/images/icons/pillar_energy.webp',
    image: '/images/pillars/energy_recovery.png',
  },
  {
    id: 'nutrition',
    label: 'Cuida tu Alimentación',
    subtitle: 'Dieta antiinflamatoria, endo belly, nutrientes',
    color: 'var(--color-secondary)',
    bgColor: 'rgba(244,162,97,0.1)',
    icon: 'Apple',
    iconImage: '/images/icons/pillar_nutrition.webp',
    image: '/images/pillars/nutrition_care.png',
  },
  {
    id: 'hormones',
    label: 'Equilibra tus Hormonas',
    subtitle: 'Ciclo menstrual, fertilidad, balance hormonal',
    color: 'var(--color-info)',
    bgColor: 'rgba(69,123,157,0.1)',
    icon: 'Droplets',
    iconImage: '/images/icons/pillar_hormones.webp',
    image: '/images/pillars/hormonal_balance.png',
  },
  {
    id: 'wellbeing',
    label: 'Fortalece tu Bienestar',
    subtitle: 'Salud mental, mindfulness, apoyo emocional',
    color: 'var(--color-accent)',
    bgColor: 'rgba(231,111,81,0.1)',
    icon: 'Smile',
    iconImage: '/images/icons/pillar_wellbeing.webp',
    image: '/images/pillars/wellbeing_strength.png',
  },
]

export function getPillarById(id: PillarId): Pillar | undefined {
  return PILLARS.find(p => p.id === id)
}

export const PILLAR_COLORS: Record<PillarId, string> = {
  pain: 'var(--color-primary)',
  energy: 'var(--color-success)',
  nutrition: 'var(--color-secondary)',
  hormones: 'var(--color-info)',
  wellbeing: 'var(--color-accent)',
}
