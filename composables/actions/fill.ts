import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const fill: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCard: BoardCard) => {
  const boardStore = useBoardStore()

  assert(baseCard.amount !== null, 'Action `fill` requires the base card to have an amount!')
  assert(baseCard.card.container !== undefined, 'Action `fill` requires the base card to have a container!')
  assert(baseCard.card.containerMax !== undefined, 'Action `fill` requires the base card to have a containerMax!')
  assert(interactingCard.amount !== null, 'Action `fill` requires the interacting card to have an amount!')

  const remaining = baseCard.card.containerMax - baseCard.amount
  const amount = Math.min(remaining, interactingCard.amount)

  baseCard.amount += amount
  interactingCard.amount -= amount

  if (interactingCard.amount <= 0) {
    boardStore.removeCard(interactingCard)
  }
}
