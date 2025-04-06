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
      stackedCard: undefined,
      parentCard: undefined,
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
    parentCard.stackedCard = card

    const x = parentCard.x
    const y = parentCard.z + DeckStackPadding

    card.x = x
    card.z = y

    return {
      x,
      y,
    }
  }

  function unstackCard(card: BoardCard, position: { x: number, y: number }) {
    if (!card.parentCard) return

    card.parentCard.stackedCard = undefined
    card.parentCard = undefined

    card.x = position.x
    card.z = position.y
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
