import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const combine: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCard: BoardCard) => {
  const boardStore = useBoardStore()

  assert(baseCard.amount !== null, 'Action `combine` requires the base card to have an amount!')
  assert(interactingCard.amount !== null, 'Action `combine` requires the interacting card to have an amount!')

  baseCard.amount += interactingCard.amount
  boardStore.removeCard(interactingCard)
}
