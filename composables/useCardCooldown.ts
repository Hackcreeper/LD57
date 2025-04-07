import type { BoardCard } from '~/types/Board'

export const useCardCooldown = () => {
  const startCooldown = (card: BoardCard) => {
    card.cooldownStartAt = Date.now()
    card.cooldownRemainingSeconds = (card.card.cooldown ?? 0) - ((Date.now() - card.cooldownStartAt) / 1000)

    card.cooldownIntervalId = setInterval(() => {
      card.cooldownRemainingSeconds = (card.card.cooldown ?? 0) - ((Date.now() - (card.cooldownStartAt ?? 0)) / 1000)
    }, 10)
  }

  return {
    startCooldown,
  }
}
