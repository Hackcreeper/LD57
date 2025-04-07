import type { CardsCollectionItem } from '@nuxt/content'
import { canInteractWithTrade } from './special-cards/tradeCard'
import type { BoardCard } from '~/types/Board'

export const useInteraction = (draggingCard: BoardCard) => {
  const boardStore = useBoardStore()
  const { runActions } = useAction()
  const { startCooldown } = useCardCooldown()

  const getAvailableInteractions = (boardCard: BoardCard): string[] => {
    return (boardCard.card.interactions ?? []).map(interaction => interaction.card)
  }

  const getInteraction = (boardCard: BoardCard): CardsCollectionItem['interactions'][0] | undefined => {
    const ownInteraction = boardCard.card.interactions?.find(interaction => interaction.card === draggingCard.card.identifier)
    if (ownInteraction) return ownInteraction

    return boardCard.card.interactions?.find(interaction => interaction.card === draggingCard.card.extend)
  }

  const hasInteractionWith = (boardCard: BoardCard): boolean => {
    if (boardCard.uniqueId === draggingCard.uniqueId) return false

    const interaction = getInteraction(boardCard)
    if (!interaction) return false
    if (interaction.consumeContainer && (boardCard.amount ?? 0) <= 0) return false
    if (boardCard.cooldownRemainingSeconds && boardCard.cooldownRemainingSeconds > 0) return false
    if (!interaction.amount) return true
    if (!draggingCard.amount) return false

    if (boardCard.card.identifier === 'trade') {
      return canInteractWithTrade(boardCard, draggingCard)
    }

    return draggingCard.amount >= interaction.amount
  }

  const interact = (boardCard: BoardCard) => {
    const interaction = getInteraction(boardCard)
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

    if (boardCard.currentInteraction.consumeContainer && boardCard.amount !== null) {
      boardCard.amount = clamp(boardCard.amount - 1, 0, boardCard.card.containerMax ?? 0)
    }

    let someoneDied = false

    nextTick(() => {
      // If the card has health and is now down to 0 health, remove it
      if (boardCard.currentHealth !== null && boardCard.currentHealth <= 0) {
        runActions(boardCard.card.onDeath ?? [], boardCard, draggingCard)
        boardStore.removeCard(boardCard)
        someoneDied = true
      }

      // If the interacting card has health and is now down to 0 health, remove it
      if (draggingCard.currentHealth !== null && draggingCard.currentHealth <= 0) {
        runActions(draggingCard.card.onDeath ?? [], boardCard, draggingCard)
        boardStore.removeCard(draggingCard)
        someoneDied = true
      }

      // If the card should be consumed, reduce the amount or remove it without triggering onDeath if amount <= 0
      if (boardCard.currentInteraction?.consume) {
        if (draggingCard.amount === null) {
          boardStore.removeCard(draggingCard)
        }
        else {
          const amount = boardCard.buyablePrice ?? boardCard.currentInteraction?.amount ?? 1
          draggingCard.amount -= amount

          if (draggingCard.amount <= 0) {
            boardStore.removeCard(draggingCard)
          }
        }
      }

      let someoneHealed = false

      // If the card should be healed and the card is at max health, don't heal it again
      if (
        boardCard.currentInteraction?.actions.find(action => action.type === 'heal')
        && boardCard.currentInteraction.infinite
        && draggingCard.currentHealth === draggingCard.card.health
      ) {
        someoneHealed = true
      }

      if (boardCard.card.cooldown) {
        startCooldown(boardCard)
      }

      if (
        !boardCard.currentInteraction?.infinite
        || someoneDied
        || someoneHealed
        || boardCard.card.cooldown // If there is a cooldown, it can't be infinite
        || (boardCard.currentInteraction.consumeContainer && boardCard.amount === 0)
      ) {
        const { x, y } = getDropCoordinates(boardCard.x, boardCard.z)
        boardStore.unstackCard(draggingCard, { x, y })
        return
      }

      interact(boardCard)
    })
  }

  return {
    getAvailableInteractions,
    hasInteractionWith,
    interact,
  }
}
