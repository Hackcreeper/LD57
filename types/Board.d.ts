import type { CardsCollectionItem } from '@nuxt/content'

export type BoardCard = {
  // This is automatically generated and required for vue for loops
  uniqueId: string

  // The actual card
  card: CardsCollectionItem
  currentHealth: number | null

  // Position in world-space
  x: number
  z: number

  // Information about what card is stacked on top of this one and which card is my parent
  stackedCard?: BoardCard
  parentCard?: BoardCard

  // Mark this card as a new card
  isNew: boolean

  // Handle timed interactions
  interactionTimeoutId?: ReturnType<typeof setTimeout>
  interactionIntervalId?: ReturnType<typeof setInterval>
  interactionStartAt?: number
  interactionFinishAt?: number
  interactionProgress?: number
  currentInteraction?: CardsCollectionItem['interactions'][0]
}
