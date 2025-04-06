import type { BoardCard } from '~/types/Board'

export const useActiveCard = (boardCard: BoardCard, mouseOver: Ref<boolean>, isDragging: Ref<boolean>) => {
  const boardStore = useBoardStore()
  const isActive = computed(() => mouseOver.value && !isDragging.value)

  watch(isActive, (active) => {
    if (active) {
      boardStore.setActiveCard(boardCard)
      return
    }

    boardStore.unsetActiveCard(boardCard)
  })

  return {}
}
