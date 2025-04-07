import type { CardsCollectionItem } from '@nuxt/content'
import type { Action } from '~/types/Action'
import type { BoardCard } from '~/types/Board'

export const reveal: Action = (_action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, _interactingCard: BoardCard) => {
  const progressStore = useProgressStore()

  progressStore.events.find(event => !event.revealed)!.revealed = true
}
