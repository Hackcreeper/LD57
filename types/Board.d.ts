import type { CardsCollectionItem } from '@nuxt/content'

export type BoardCard = {
  // This is automatically generated and required for vue for loops
  uniqueId: string

  // The actual card
  card: CardsCollectionItem
  currentHealth?: number

  // Position in world-space
  x: number
  z: number

  // Information about what card is stacked on top of this one and which card is my parent
  stackedCard: BoardCard | undefined
  parentCard: BoardCard | undefined
}
