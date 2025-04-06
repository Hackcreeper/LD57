import type { BoardCard } from '~/types/Board'

export const useInteraction = (draggingCard: BoardCard) => {
  const getAvailableInteractions = (boardCard: BoardCard): string[] => {
    return (boardCard.card.interactions ?? []).map(interaction => interaction.card)
  }

  const hasInteractionWith = (boardCard: BoardCard): boolean => {
    return getAvailableInteractions(boardCard).includes(draggingCard.card.identifier)
  }

  return {
    getAvailableInteractions,
    hasInteractionWith,
  }
}
