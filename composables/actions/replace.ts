import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const replace: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const cardStore = useCardStore()

  assert(action.card !== undefined, 'Action `replace` requires the `card` property to be set!')

  const card = cardStore.getCardByIdentifier(action.card)
  assert(card !== undefined, 'Card not found!')

  boardStore.removeCard(baseCard)
  boardStore.addCard(card, baseCard.x, baseCard.z)
}
