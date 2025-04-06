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

  disabled: () => !isDragging.value && !hoveringOverBottomCard.value,

  // Make sure the card is always in the bounds of the container
  containerElement: container,

  // Make sure to update all cards that are stacked on top of me with their respective new positions
  onEnd: (position) => {
    // Set position of bottom card of deck
    boardStore.setCardPosition(props.boardCard, position.x, position.y)

    // Update the position of all stacked cards
    props.boardCard.stackedCards.forEach((card, index) => {
      boardStore.setCardPosition(card, position.x, position.y + (index + 1) * 22)
    })
  },
})

// Handle active card (which card would I interact with)
const mouseOver = ref(false)
const isActive = computed(() => mouseOver.value && !isDragging.value)

watch(isActive, (active) => {
  if (active) {
    boardStore.setActiveCard(props.boardCard)
    return
  }

  boardStore.unsetActiveCard(props.boardCard)
})

// This allow to have special vue components for cards
const specialComponents = import.meta.glob('~/components/Object/Card/Visual/*.vue')
const uppercasedId = computed(() => props.boardCard.card.identifier.charAt(0).toUpperCase() + props.boardCard.card.identifier.slice(1))
const customComponentName = computed(() => {
  const fullString = `/components/Object/Card/Visual/ObjectCardVisual${uppercasedId.value}.vue`
  if (specialComponents[fullString]) return `ObjectCardVisual${uppercasedId.value}`

  return `ObjectCardVisualDefault`
})
</script>

<template>
  <div
    ref="deck"
    class="fixed select-none"
    :class="{ 'z-10 scale-90 transition-transform': isDragging }"
    :style="style"
    @mouseenter="mouseOver = true"
    @mouseleave="mouseOver = false"
  >
    <div
      class="w-[70px] h-[100px]"
      :class="{
        'z-10': boardCard.parentCard,
      }"
      @mouseenter="hoveringOverBottomCard = true"
      @mouseleave="hoveringOverBottomCard = false"
    >
      <Component
        :is="customComponentName"
        :board-card="boardCard"
      />
    </div>

    <ObjectCardDeckStacked
      v-for="(card, index) in boardCard.stackedCards"
      :key="'stack-' + card.uniqueId"
      :board-card="card"
      :parent-card="boardCard"
      :is-last-card="index === boardCard.stackedCards.length - 1"
      :position="{ x: 0, y: (index + 1) * 22 }"
    />
  </div>
</template>
