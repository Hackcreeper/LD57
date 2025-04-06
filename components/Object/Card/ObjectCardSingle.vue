<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

// Use stores & composables
const boardStore = useBoardStore()
const { activeCard } = storeToRefs(boardStore) // This is the card, the user is currently hovering above

const { hasInteractionWith } = useInteraction(props.boardCard)

// Handle dragging single cards
const originalPosition = ref({ x: 0, y: 0 })
const cardEl = useTemplateRef<HTMLDivElement>('card')
const container = inject<Readonly<Ref<HTMLDivElement>>>('container')

const { style, position: cardPosition, isDragging } = useDraggable(cardEl, {
  initialValue: { x: props.boardCard.x, y: props.boardCard.z },

  // Make sure the card is always in the bounds of the container
  containerElement: container,

  // Whenever we start a dragging operation, store the original position so that we may revert it
  onStart: () => {
    originalPosition.value.x = props.boardCard.x
    originalPosition.value.y = props.boardCard.z
  },

  onEnd: (position) => {
    // Update the position of the card, so that it correctly reflected in the data
    boardStore.setCardPosition(props.boardCard, position.x, position.y)

    // If we don't try to interact with any card, end early.
    const card = activeCard.value
    if (!card) {
      return
    }

    // If there are no interactions possible between the cards, move the card to its original position
    if (!hasInteractionWith(card)) {
      boardStore.setCardPosition(props.boardCard, originalPosition.value.x, originalPosition.value.y)
      cardPosition.value.x = originalPosition.value.x
      cardPosition.value.y = originalPosition.value.y
      return
    }

    // Otherwise, stack the card on top of the card, that is currently active and update the position accordingly
    cardPosition.value = boardStore.stackCard(props.boardCard, card)
  },
})

// This allow to have special vue components for cards
const { getVisualComponentName } = useCardVisual()

// Handle active card (which card would I interact with)
const { isOutside } = useMouseInElement(cardEl)
const isInside = computed(() => !isOutside.value)
useActiveCard(props.boardCard, isInside, isDragging)

// Calculate classes
const classes = computed(() => {
  let classes = `absolute ${CardClasses}`

  if (isDragging.value) {
    classes += ' z-10 scale-90 transition-transform pointer-events-none'
  }

  return classes
})
</script>

<template>
  <div
    ref="card"
    :style="style"
    :class="classes"
  >
    <Component
      :is="getVisualComponentName(boardCard.card)"
      :board-card="boardCard"
    />
  </div>
</template>
