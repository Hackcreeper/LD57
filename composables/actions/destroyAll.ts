import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const destroyAll: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, _interactingCard: BoardCard) => {
  const boardStore = useBoardStore()

  assert(action.card !== undefined, 'Action `destroyAll` requires the `card` property to be set!')

  boardStore.removeCardsByIdentifier(action.card)
}
