import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

export const travel: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, _interactingCard: BoardCard) => {
  console.log('coming soon')
}
