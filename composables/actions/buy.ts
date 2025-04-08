import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const buy: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const cardStore = useCardStore()

  assert(action.card !== undefined, 'Action `buy` requires the `card` property to be set!')

  const card = cardStore.getCardByIdentifier(action.card)
  assert(card !== undefined, 'Card not found!')
  assert(typeof action.amount === 'number', 'Action `buy` requires the `amount` property to be set to an number!')

  const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
  boardStore.addCard(card, x, y, true, action.amount * (interactingCard.amount ?? 1))
}
