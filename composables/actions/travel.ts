import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const travel: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, _interactingCard: BoardCard) => {
  const progressStore = useProgressStore()
  assert(typeof action.amount === 'number', 'Action `travel` requires the `amount` property to be set and a valid number!')

  progressStore.advance(action.amount)
}
