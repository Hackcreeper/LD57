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

    boardCard.currentInteraction = interaction
    if ((interaction.time ?? 0) <= 0) {
      runInteractionActions(boardCard)
      return
    }

    boardCard.interactionStartAt = Date.now()
    boardCard.interactionFinishAt = (new Date(Date.now() + (interaction.time ?? 0) * 1000)).getTime()
    boardCard.interactionProgress = 0
    boardCard.interactionTimeoutId = setTimeout(() => {
      runInteractionActions(boardCard)
    }, (interaction.time ?? 0) * 1000)

    boardCard.interactionIntervalId = setInterval(() => {
      const now = new Date().getTime()
      const totalTime = (boardCard.interactionFinishAt ?? 0) - (boardCard.interactionStartAt ?? 0)
      const progress = now - (boardCard.interactionStartAt ?? 0)

      boardCard.interactionProgress = clamp((progress / totalTime) * 100, 0, 100)
    }, 10)
  }

  const runInteractionActions = (boardCard: BoardCard) => {
    assert(boardCard.currentInteraction !== undefined, 'Interaction not found')

    if (boardCard.interactionIntervalId) {
      clearInterval(boardCard.interactionIntervalId)
    }

    runActions(boardCard.currentInteraction.actions, boardCard, draggingCard)

    // Drop the card
    const { x, y } = getDropCoordinates(boardCard.x, boardCard.z)
    nextTick(() => {
      // If the card has health and is now down to 0 health, remove it
      if (boardCard.currentHealth !== null && boardCard.currentHealth <= 0) {
        runActions(boardCard.card.onDeath ?? [], boardCard, draggingCard)
        boardStore.removeCard(boardCard)
      }

      // If the interacting card has health and is now down to 0 health, remove it
      if (draggingCard.currentHealth !== null && draggingCard.currentHealth <= 0) {
        runActions(draggingCard.card.onDeath ?? [], boardCard, draggingCard)
        boardStore.removeCard(draggingCard)
      }

      // If the card should be consumed, remove it without triggering onDeath
      if (boardCard.currentInteraction?.consume) {
        boardStore.removeCard(draggingCard)
      }

      boardStore.unstackCard(draggingCard, { x, y })
    })
  }

  return {
    getAvailableInteractions,
    hasInteractionWith,
    interact,
  }
}
