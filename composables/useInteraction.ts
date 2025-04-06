import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'

export const useInteraction = (draggingCard: BoardCard) => {
  const cardStore = useCardStore()

  const getAvailableInteractions = (boardCard: BoardCard): string[] => {
    // Basically, iterate through the interactions of the given boardCard
    // Then check what cards are already stacked on top of it
    // And only return cards that still can be stacked (also in regards to amount)
    const allInteractions = boardCard.card.interactions ?? []
    const possibleCards: { [key: string]: number } = {}
    allInteractions.forEach((interaction) => {
      // First check if there are already cards added that are NOT within the scope of the interaction
      // TODO: Do it
      // If so it will be filtered out

      // Then reduce the amount of each card in each interaction by the amount already stacked
      interaction.cards.forEach((card) => {
        possibleCards[card.identifier] ??= 0
        possibleCards[card.identifier] += card.amount ?? 1
      })
    })

    const remaining: string[] = []
    for (const identifier in possibleCards) {
      if (possibleCards[identifier] <= 0) continue
      remaining.push(identifier)
    }

    return remaining
  }

  const hasInteractionWith = (boardCard: BoardCard): boolean => {
    return getAvailableInteractions(boardCard).includes(draggingCard.card.identifier)
  }

  return {
    getAvailableInteractions,
    hasInteractionWith,
  }
}
