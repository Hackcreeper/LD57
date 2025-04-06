import type { CardsCollectionItem } from '@nuxt/content'

export type Action = (interaction: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCart: BoardCard) => void
