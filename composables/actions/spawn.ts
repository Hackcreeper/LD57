import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const spawn: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const cardStore = useCardStore()

  assert(action.card !== undefined, 'Action `spawn` requires the `card` property to be set!')

  const card = cardStore.getCardByIdentifier(action.card)
  assert(card !== undefined, 'Card not found!')

  for (let i = 0; i < (action.amount ?? 1); i++) {
    const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
    boardStore.addCard(card, x, y)
  }
}
