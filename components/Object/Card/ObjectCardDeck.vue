<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

// Stores
const boardStore = useBoardStore()

// Handle dragging card decks
const hoveringOverBottomCard = ref(false)
const deckEl = useTemplateRef<HTMLDivElement>('deck')
const container = inject<Readonly<Ref<HTMLDivElement>>>('container')

const { style, isDragging } = useDraggable(deckEl, {
  initialValue: { x: props.boardCard.x, y: props.boardCard.z },

  // Disable it when not directly hovering over the header of bottom card
  disabled: () => !isDragging.value && !hoveringOverBottomCard.value,

  // Make sure the card is always in the bounds of the container
  containerElement: container,

  // Make sure to update all cards that are stacked on top of me with their respective new positions
  onEnd: (position) => {
    // Set position of bottom card of deck
    boardStore.setCardPosition(props.boardCard, position.x, position.y)

    // Update the position of all stacked cards
    props.boardCard.stackedCards.forEach((card, index) => {
      boardStore.setCardPosition(card, position.x, position.y + (index + 1) * DeckStackPadding)
    })
  },
})

// Handle active card (which card would I interact with)
const mouseOver = ref(false)
useActiveCard(props.boardCard, mouseOver, isDragging)

// This allow to have special vue components for cards
const { getVisualComponentName } = useCardVisual()
</script>

<template>
  <div
    ref="deck"
    class="absolute"
    :class="{ 'z-10 scale-90 transition-transform': isDragging }"
    :style="style"
    @mouseenter="mouseOver = true"
    @mouseleave="mouseOver = false"
  >
    <div
      :class="CardClasses"
      @mouseenter="hoveringOverBottomCard = true"
      @mouseleave="hoveringOverBottomCard = false"
    >
      <Component
        :is="getVisualComponentName(boardCard.card)"
        :board-card="boardCard"
      />
    </div>

    <ObjectCardDeckStacked
      v-for="(card, index) in boardCard.stackedCards"
      :key="'stack-' + card.uniqueId"
      :board-card="card"
      :parent-card="boardCard"
      :is-last-card="index === boardCard.stackedCards.length - 1"
      :position="{ x: 0, y: (index + 1) * DeckStackPadding }"
    />
  </div>
</template>
