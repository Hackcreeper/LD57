import type { CardsCollectionItem } from '@nuxt/content'

export type BoardCard = {
  // This is automatically generated and required for vue for loops
  uniqueId: string

  // The actual card
  card: CardsCollectionItem

  // Position in world-space
  x: number
  z: number

  // These are all the cards, that are stacked on top of this card
  stackedCards: BoardCard[]

  // This is the `parent` where I am stacked on top
  parentCard: BoardCard | undefined
  stackLevel: number
}
