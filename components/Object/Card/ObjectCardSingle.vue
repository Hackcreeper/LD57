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
const dragging = ref(false)
const originalPosition = ref({ x: 0, y: 0 })
const cardEl = useTemplateRef<HTMLDivElement>('card')
const container = inject<Readonly<Ref<HTMLDivElement>>>('container')

const { style, position: cardPosition } = useDraggable(cardEl, {
  initialValue: { x: props.boardCard.x, y: props.boardCard.z },

  // Make sure the card is always in the bounds of the container
  containerElement: container,

  // Whenever we start a dragging operation, store the original position so that we may revert it
  onStart: () => {
    dragging.value = true
    originalPosition.value.x = props.boardCard.x
    originalPosition.value.y = props.boardCard.z
  },

  onEnd: (position) => {
    dragging.value = false

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
const specialComponents = import.meta.glob('~/components/Object/Card/Visual/*.vue')
const uppercasedId = computed(() => props.boardCard.card.identifier.charAt(0).toUpperCase() + props.boardCard.card.identifier.slice(1))
const customComponentName = computed(() => {
  const fullString = `/components/Object/Card/Visual/ObjectCardVisual${uppercasedId.value}.vue`
  if (specialComponents[fullString]) return `ObjectCardVisual${uppercasedId.value}`

  return `ObjectCardVisualDefault`
})

// Handle active card (which card would I interact with)
const { isOutside } = useMouseInElement(cardEl)
const isActive = computed(() => !isOutside.value && !dragging.value)

watch(isActive, (active) => {
  if (active) {
    boardStore.setActiveCard(props.boardCard)
    return
  }

  boardStore.unsetActiveCard(props.boardCard)
})
</script>

<template>
  <div
    ref="card"
    :style="style"
    class="w-[70px] h-[100px] absolute select-none"
    :class="{
      'z-10 scale-90 transition-transform pointer-events-none': dragging,
    }"
  >
    <Component
      :is="customComponentName"
      :board-card="boardCard"
    />
  </div>
</template>
