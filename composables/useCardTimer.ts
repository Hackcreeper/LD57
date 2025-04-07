import type { BoardCard } from '~/types/Board'

export const useCardTimer = () => {
  const { runActions } = useAction()

  const init = (card: BoardCard) => {
    if (!card.card.timer) return

    card.timerStartAt = Date.now()
    card.timerFinishAt = (new Date(Date.now() + (card.card.timer.time ?? 0) * 1000)).getTime()
    card.timerProgress = 0

    card.timerTimeoutId = setTimeout(() => {
      assert(card.card.timer?.actions !== undefined, `Card '${card.card.label}' with timer needs actions`)

      runActions(card.card.timer.actions, card, card)
    }, (card.card.timer.time ?? 0) * 1000)

    card.timerIntervalId = setInterval(() => {
      const now = new Date().getTime()
      const totalTime = (card.timerFinishAt ?? 0) - (card.timerStartAt ?? 0)
      const progress = now - (card.timerStartAt ?? 0)

      card.timerProgress = clamp((progress / totalTime) * 100, 0, 100)
    }, 10)
  }

  const reset = (card: BoardCard) => {
    if (card.timerTimeoutId) clearTimeout(card.timerTimeoutId)
    if (card.timerIntervalId) clearInterval(card.timerIntervalId)

    card.timerStartAt = card.timerFinishAt = card.timerProgress = card.timerTimeoutId = card.timerIntervalId = undefined
  }

  return {
    init,
    reset,
  }
}
