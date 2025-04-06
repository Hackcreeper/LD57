export const useDemoCards = () => {
  const boardStore = useBoardStore()
  const levelStore = useLevelStore()
  const cardStore = useCardStore()
  const { container } = storeToRefs(levelStore)

  const spawn = (cards: string[]) => {
    const padding = 20

    watchOnce(container, () => {
      const maxWidth = (container.value?.clientWidth ?? 100)
      let row = 0
      let column = 0
      let index = 1

      cards.forEach((cardIdentifier) => {
        if ((index * (CardWidth + padding) / (row + 1)) > maxWidth) {
          column = 0
          row++
        }

        const x = padding + column++ * (CardWidth + padding)
        const y = padding + row * (CardHeight + padding)

        const card = cardStore.getCardByIdentifier(cardIdentifier)
        assert(card !== undefined, 'Card not found!')

        boardStore.addCard(card, x, y)
        index++
      })
    })
  }

  return {
    spawn,
  }
}
