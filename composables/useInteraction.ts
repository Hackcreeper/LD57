import type { BoardCard } from '~/types/Board'

export const useInteraction = (draggingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const { runActions } = useAction()

  const getAvailableInteractions = (boardCard: BoardCard): string[] => {
    return (boardCard.card.interactions ?? []).map(interaction => interaction.card)
  }

  const hasInteractionWith = (boardCard: BoardCard): boolean => {
    return getAvailableInteractions(boardCard).includes(draggingCard.card.identifier)
  }

  const interact = (boardCard: BoardCard) => {
    const interaction = boardCard.card.interactions?.find(interaction => interaction.card === draggingCard.card.identifier)
    if (!interaction) {
      console.error('Interaction not found')
      return
    }

    runActions(interaction.actions, boardCard, draggingCard)

    // Drop the card
    const { x, y } = getDropCoordinates(boardCard.x, boardCard.z)
    nextTick(() => {
      boardStore.unstackCard(draggingCard, { x, y })

      // If the card has health and is now down to 0 health, remove it
      if (boardCard.currentHealth !== undefined && boardCard.currentHealth <= 0) {
        runActions(boardCard.card.onDeath ?? [], boardCard, draggingCard)
        boardStore.removeCard(boardCard)
      }
    })
  }

  return {
    getAvailableInteractions,
    hasInteractionWith,
    interact,
  }
}
