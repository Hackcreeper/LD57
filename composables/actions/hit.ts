import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'
import { getRandomIntInclusive } from '~/utils/randomIntInclusive'

export const hit: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, interactingCard: BoardCard) => {
  assert(action.amount !== undefined, 'Action `hit` requires the `amount` property to be set!')
  assert(interactingCard.currentHealth !== null, 'Action `hit` requires the interacting card to have health!')

  const amount = typeof action.amount === 'number'
    ? action.amount
    : action.amount?.min && action.amount?.max
      ? getRandomIntInclusive(action.amount.min, action.amount.max)
      : 0

  interactingCard.currentHealth = Math.max(0, interactingCard.currentHealth - amount)
}
