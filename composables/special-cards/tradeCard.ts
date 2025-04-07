import type { BoardCard } from '~/types/Board'

export const tradeCard = (card: BoardCard) => {
  const cardStore = useCardStore()

  const buyableCard = cardStore.getRandomBuyableCard()
  assert(buyableCard !== undefined, 'No buyable card found!')
  assert(buyableCard.price !== undefined, `Buyable card '${buyableCard.label}' has no price`)

  card.buyableCard = buyableCard
  card.buyableAmount = Math.floor(Math.random() * (buyableCard.buyableMaxAmount ?? 1)) + 1
  card.buyablePrice = card.buyableAmount * buyableCard.price
}

export const canInteractWithTrade = (tradeCard: BoardCard, draggingCard: BoardCard) => {
  if (!draggingCard.amount) return false

  assert(tradeCard.buyablePrice !== undefined, `Trading card has no buy price`)

  return draggingCard.amount >= tradeCard.buyablePrice
}
