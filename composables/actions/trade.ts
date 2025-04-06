import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const trade: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()

  assert(baseCard.buyableCard !== undefined, 'Action `trade` requires the base card to have a buyable card!')
  assert(baseCard.buyableAmount !== undefined, 'Action `trade` requires the base card to have a buyable amount!')

  if (baseCard.buyableAmount > 3) {
    const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
    boardStore.addCard(baseCard.buyableCard, x, y, true, baseCard.buyableAmount)
    return
  }

  for (let i = 0; i < baseCard.buyableAmount; i++) {
    const { x, y } = getDropCoordinates(baseCard.x, baseCard.z)
    boardStore.addCard(baseCard.buyableCard, x, y)
  }
}
