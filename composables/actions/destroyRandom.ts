import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const destroyRandom: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const { runActions } = useAction()

  // Get random card from types: person, building, merchant, limitedUsage
  const randomCard = boardStore.getRandomCardByTypes(['person', 'building', 'merchant', 'limitedUsage'])
  console.log(randomCard?.card.label)
  if (!randomCard) return

  if (randomCard.currentHealth) {
    runActions(randomCard.card.onDeath ?? [], randomCard, randomCard)
  }

  boardStore.removeCard(randomCard)
}
