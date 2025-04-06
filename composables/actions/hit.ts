import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const hit: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, interactingCart: BoardCard) => {
  assert(action.amount !== undefined, 'Action `hit` requires the `amount` property to be set!')
  assert(interactingCart.currentHealth !== null, 'Action `hit` requires the interacting card to have health!')

  interactingCart.currentHealth = Math.max(0, interactingCart.currentHealth - action.amount)
}
