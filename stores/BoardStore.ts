import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'

export const useBoardStore = defineStore('board', () => {
  // This is the actual board
  const board = ref<BoardCard[]>([])

  function addCard(card: CardsCollectionItem, x: number, z: number): void {
    board.value.push({
      uniqueId: crypto.randomUUID(), // We iterate through each card, so we need something unique for Vue
      card,
      x,
      z,
    })
  }

  return {
    board: readonly(board),
    addCard,
  }
})
