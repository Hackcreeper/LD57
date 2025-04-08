import type { CardsCollectionItem } from '@nuxt/content'

export type BoardCard = {
  // This is automatically generated and required for vue for loops
  uniqueId: string

  // The actual card
  card: CardsCollectionItem

  // Meta information about the card
  currentHealth: number | null
  amount: number | null

  // Position in world-space
  x: number
  z: number

  // Information about what card is stacked on top of this one and which card is my parent
  stackedCard?: BoardCard
  parentCard?: BoardCard

  // Mark this card as a new card
  isNew: boolean
  isDead: boolean

  // Handle timed interactions
  interactionTimeoutId?: ReturnType<typeof setTimeout>
  interactionIntervalId?: ReturnType<typeof setInterval>
  interactionStartAt?: number
  interactionFinishAt?: number
  interactionProgress?: number
  currentInteraction?: CardsCollectionItem['interactions'][0]

  // Special proeprties for trading cards
  buyableCard?: CardsCollectionItem
  buyableAmount?: number
  buyablePrice?: number

  // Handle timer actions
  timerTimeoutId?: ReturnType<typeof setTimeout>
  timerIntervalId?: ReturnType<typeof setInterval>
  timerStartAt?: number
  timerFinishAt?: number
  timerProgress?: number

  // Handle cooldown
  cooldownIntervalId?: ReturnType<typeof setInterval>
  cooldownStartAt?: number
  cooldownRemainingSeconds?: number
}
