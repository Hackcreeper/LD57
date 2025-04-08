import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const destroyInteracting: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCard: BoardCard) => {
  const boardStore = useBoardStore()

  if (baseCard.stackedCard) {
    const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
    boardStore.unstackCard(baseCard.stackedCard, { x, y })
  }

  boardStore.removeCard(interactingCard)
}
