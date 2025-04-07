import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const destroy: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()

  const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
  boardStore.unstackCard(baseCard.stackedCard as BoardCard, { x, y })

  boardStore.removeCard(baseCard)
}
