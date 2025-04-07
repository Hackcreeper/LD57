import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'
import { getRandomIntInclusive } from '~/utils/randomIntInclusive'

export const damage: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  assert(action.amount !== undefined, 'Action `damage` requires the `amount` property to be set!')
  assert(baseCard.currentHealth !== null, 'Action `damage` requires the base card to have health!')

  const amount = typeof action.amount === 'number'
    ? action.amount
    : (action.amount?.min ?? undefined) !== undefined && (action.amount?.max ?? undefined) !== undefined
        ? getRandomIntInclusive(action.amount.min, action.amount.max)
        : 0

  baseCard.currentHealth = Math.max(0, baseCard.currentHealth - amount)
}
