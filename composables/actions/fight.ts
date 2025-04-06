import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const fight: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCard: BoardCard) => {
  assert(baseCard.currentHealth !== null, 'Action `fight` requires the base card to have health!')
  assert(interactingCard.currentHealth !== null, 'Action `fight` requires the interacting card to have health!')
  assert(baseCard.card.strength !== undefined, 'Action `fight` requires the base card to have strength!')
  assert(interactingCard.card.strength !== undefined, 'Action `fight` requires the interacting card to have strength!')

  baseCard.currentHealth = Math.max(0, baseCard.currentHealth - interactingCard.card.strength)
  interactingCard.currentHealth = Math.max(0, interactingCard.currentHealth - baseCard.card.strength)
}
