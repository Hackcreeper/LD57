import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'
import { getRandomIntInclusive } from '~/utils/randomIntInclusive'

export const spawn: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const cardStore = useCardStore()

  assert(action.card !== undefined, 'Action `spawn` requires the `card` property to be set!')

  const card = cardStore.getCardByIdentifier(action.card)
  assert(card !== undefined, 'Card not found!')

  const amount = typeof action.amount === 'number'
    ? action.amount
    : action.amount?.min && action.amount?.max
      ? getRandomIntInclusive(action.amount.min, action.amount.max)
      : 1

  for (let i = 0; i < amount; i++) {
    const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
    boardStore.addCard(card, x, y)
  }
}
