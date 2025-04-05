import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import { CardHeight, CardWidth } from '~/util/consts'

export const useBoardStore = defineStore('board', () => {
  // This is the actual board
  const board = ref<BoardCard[]>([])

  function addCard(card: CardsCollectionItem, x: number, z: number): void {
    board.value.push({
      uniqueId: crypto.randomUUID(), // We iterate through each card, so we need something unique for Vue
      card,
      x,
      z,
      highlight: false,
    })
  }

  function getIntersectingCards(x: number, z: number) {
    // Fuck raycasting, we do it the simple old way. Iterating through each card, like a pro 😈
    for (const card of board.value) {
      // Simple AABB collision detection
      if (x > card.x - CardWidth / 2 && x < card.x + CardWidth / 2 && z > card.z - CardHeight / 2 && z < card.z + CardHeight / 2) {
        card.highlight = true
      }
    }
  }

  return {
    board: readonly(board),
    addCard,
    getIntersectingCards,
  }
})
