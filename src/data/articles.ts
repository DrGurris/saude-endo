import type { WebArticle, PillarId, PhenotypeType } from '../types'
import { PAIN_ARTICLES } from './articles/painArticles'
import { ENERGY_ARTICLES } from './articles/energyArticles'
import { NUTRITION_ARTICLES } from './articles/nutritionArticles'
import { HORMONES_ARTICLES } from './articles/hormonesArticles'
import { WELLBEING_ARTICLES } from './articles/wellbeingArticles'

export const ARTICLES: WebArticle[] = [
  ...PAIN_ARTICLES,
  ...ENERGY_ARTICLES,
  ...NUTRITION_ARTICLES,
  ...HORMONES_ARTICLES,
  ...WELLBEING_ARTICLES,
]

export function getArticlesForPillar(
  pillarId: PillarId,
  phenotype?: PhenotypeType
): WebArticle[] {
  const pillarArticles = ARTICLES.filter(a => a.pillarId === pillarId)

  if (!phenotype) return pillarArticles

  return [...pillarArticles].sort((a, b) => {
    const aRelevant = a.phenotypeRelevance.includes(phenotype) ? 1 : 0
    const bRelevant = b.phenotypeRelevance.includes(phenotype) ? 1 : 0
    return bRelevant - aRelevant
  })
}
