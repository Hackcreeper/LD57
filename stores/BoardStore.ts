import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'

export const useBoardStore = defineStore('board', () => {
  // This is the actual board
  const board = ref<BoardCard[]>([])
  const activeCard = ref<BoardCard | undefined>()

  function addCard(card: CardsCollectionItem, x: number, z: number): void {
    board.value.push({
      uniqueId: crypto.randomUUID(), // We iterate through each card, so we need something unique for Vue
      card,
      x,
      z,
      stackedCards: [],
      parentCard: undefined,
      stackLevel: 0,
    })
  }

  function setActiveCard(card: BoardCard) {
    activeCard.value = card
  }

  function unsetActiveCard(card: BoardCard | undefined) {
    if (activeCard.value === card) activeCard.value = undefined
  }

  function setCardPosition(card: BoardCard, x: number, z: number) {
    card.x = x
    card.z = z
  }

  function stackCard(card: BoardCard, parentCard: BoardCard): { x: number, y: number } {
    card.parentCard = parentCard

    parentCard.stackedCards.push(card)

    const x = parentCard.x
    const y = parentCard.z + 30

    card.x = x
    card.z = y

    card.stackLevel = parentCard.stackLevel + 1

    return {
      x,
      y,
    }
  }

  function unstackCard(card: BoardCard) {
    if (!card.parentCard) return

    card.parentCard.stackedCards = card.parentCard.stackedCards.filter(c => c !== card)
    card.parentCard = undefined
    card.stackLevel = 0
  }

  return {
    board: board,
    activeCard: activeCard,
    addCard,
    setActiveCard,
    unsetActiveCard,
    setCardPosition,
    stackCard,
    unstackCard,
  }
})
