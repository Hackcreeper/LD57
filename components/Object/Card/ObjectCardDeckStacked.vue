<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
  parentCard: BoardCard
}>()

// Usage of stores
const boardStore = useBoardStore()

// Handle dragging card decks
const movedOnce = ref(false)
const cardEl = useTemplateRef<HTMLDivElement>('card')
const container = inject<Readonly<Ref<HTMLDivElement>>>('container')

const { style, isDragging } = useDraggable(cardEl, {
  initialValue: { x: 0, y: DeckStackPadding },

  // Make sure the card is always in the bounds of the container
  containerElement: container,

  // We need to remember that we moved once to calculate the offset
  // required by stacking
  onMove: () => {
    movedOnce.value = true
  },

  onEnd: (position) => {
    boardStore.unstackCard(props.boardCard, position)
  },
})

// Calculate the offset based on the parent card
const offset = computed(() => {
  if (!movedOnce.value) return ''

  return `left: -${props.parentCard.x}px; top: -${props.parentCard.z}px;`
})

// This allow to have special vue components for cards
const { getVisualComponentName } = useCardVisual()

// Calculate classes
const classes = computed(() => {
  let classes = `absolute ${CardClasses}`

  if (isDragging.value) {
    classes += ' z-10 pointer-events-none'
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
    <div
      class="w-full h-full"
      :class="{ 'absolute': movedOnce, 'scale-90': isDragging }"
      :style="offset"
    >
      <Component
        :is="getVisualComponentName(boardCard.card)"
        :board-card="boardCard"
      />
    </div>
  </div>
</template>
