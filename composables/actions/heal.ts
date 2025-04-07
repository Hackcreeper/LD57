import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const heal: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, interactingCard: BoardCard) => {
  assert(action.amount !== undefined, 'Action `heal` requires the `amount` property to be set!')
  assert(interactingCard.currentHealth !== null, 'Action `heal` requires the interacting person to be alive!')
  assert(interactingCard.card.health !== undefined, 'Action `heal` requires `health` to be set!')

  const amount = getAmount(action.amount)

  interactingCard.currentHealth = clamp(interactingCard.currentHealth + amount, 0, interactingCard.card.health)
}
