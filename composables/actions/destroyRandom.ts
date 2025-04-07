import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const destroyRandom: Action = async (_action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, _interactingCard: BoardCard) => {
  await nextTick()

  const boardStore = useBoardStore()
  const cardStore = useCardStore()
  const { runActions } = useAction()

  // Get random card from types: person, building, merchant, limitedUsage
  const randomCard = boardStore.getRandomCardByTypes(['person', 'building', 'merchant', 'limitedUsage'])
  if (!randomCard) return

  const fire = cardStore.getCardByIdentifier('fire')
  assert(fire !== undefined, 'Fire not found!')

  const firePos = getDropCoordinates(randomCard.x, randomCard.z)
  boardStore.addCard(fire, firePos.x, firePos.y, true)

  if (randomCard.currentHealth) {
    if (randomCard.parentCard) {
      boardStore.unstackCard(randomCard, { x: randomCard.x, y: randomCard.z })
    }
    else if (randomCard.stackedCard) {
      boardStore.unstackCard(randomCard.stackedCard, { x: randomCard.x, y: randomCard.z })
    }

    runActions(randomCard.card.onDeath ?? [], randomCard, randomCard)
  }

  boardStore.removeCard(randomCard)
}
