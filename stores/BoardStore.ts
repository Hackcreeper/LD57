import type { CardsCollectionItem } from '@nuxt/content'
import { tradeCard } from '~/composables/special-cards/tradeCard'
import type { BoardCard } from '~/types/Board'

export const useBoardStore = defineStore('board', () => {
  const levelStore = useLevelStore()
  const { runActions } = useAction()
  const { init } = useCardTimer()
  const { container } = storeToRefs(levelStore)

  // This is the actual board
  const board = ref<BoardCard[]>([])
  const activeCard = ref<BoardCard | undefined>()

  function addCard(card: CardsCollectionItem, x: number, z: number, isNew: boolean = true, amount: number | undefined = undefined) {
    const { x: cX, y: cY } = clampPosition(x, z)

    const newCard = {
      uniqueId: crypto.randomUUID(), // We iterate through each card, so we need something unique for Vue
      card,
      x: cX,
      z: cY,
      isNew,
      currentHealth: card.health ?? null,
      amount: card.amount
        ? (amount ?? card.amount)
        : card.container
          ? 0
          : null,
    }
    const newIndex = board.value.push(newCard)

    if (newCard.card.identifier === 'trade') {
      tradeCard(newCard)
    }

    if (!isNew) return

    init(board.value[newIndex - 1])
    runActions(board.value[newIndex - 1].card.onSpawn ?? [], newCard, newCard)
  }

  function removeCard(card: BoardCard) {
    board.value = board.value.filter(c => c.uniqueId !== card.uniqueId)
  }

  function removeCardsByIdentifier(identifier: string) {
    board.value = board.value.filter(c => c.card.identifier !== identifier)
  }

  function setActiveCard(card: BoardCard) {
    activeCard.value = card
  }

  function unsetActiveCard(card: BoardCard | undefined) {
    if (activeCard.value === card) activeCard.value = undefined
  }

  function setCardPosition(card: BoardCard, x: number, z: number) {
    const { x: cX, y: cY } = clampPosition(x, z)

    card.x = cX
    card.z = cY
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

  function cancelInteraction(card: BoardCard) {
    if (!card.parentCard) return
    if (!card.parentCard.interactionTimeoutId) return

    clearTimeout(card.parentCard.interactionTimeoutId)
    clearInterval(card.parentCard.interactionIntervalId)
    card.parentCard.interactionTimeoutId = undefined
    card.parentCard.interactionFinishAt = undefined
    card.parentCard.currentInteraction = undefined

    if (card.parentCard.card.timer?.resetWhenCardIsStacked) {
      init(card.parentCard)
    }
  }

  function unstackCard(card: BoardCard, position: { x: number, y: number }) {
    if (!card.parentCard) return
    cancelInteraction(card)

    card.parentCard.stackedCard = undefined
    card.parentCard = undefined

    const { x: cX, y: cY } = clampPosition(position.x, position.y)
    card.x = cX
    card.z = cY
  }

  function markCardAsOld(card: BoardCard) {
    card.isNew = false
  }

  function clampPosition(x: number, y: number): { x: number, y: number } {
    if (!container.value) return { x, y }

    return {
      x: clamp(x, 0, container.value.clientWidth - CardWidth),
      y: clamp(y, 0, container.value.clientHeight - CardHeight),
    }
  }

  function getCardByIdentifier(identifier: string): BoardCard | undefined {
    return board.value.filter(c => c.card.identifier === identifier).at(0)
  }

  function getRandomCardByTypes(types: string[]): BoardCard | undefined {
    const filtered = board.value.filter(c => types.includes(c.card.type))

    return filtered.at(Math.floor(Math.random() * filtered.length))
  }

  return {
    board: board,
    activeCard: activeCard,
    addCard,
    removeCard,
    removeCardsByIdentifier,
    setActiveCard,
    unsetActiveCard,
    setCardPosition,
    stackCard,
    unstackCard,
    markCardAsOld,
    cancelInteraction,
    getCardByIdentifier,
    getRandomCardByTypes,
  }
})
