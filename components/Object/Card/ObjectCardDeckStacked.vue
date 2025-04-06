<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
  parentCard: BoardCard
  position: { x: number, y: number }
}>()

// Handle dragging card decks
const cardEl = useTemplateRef<HTMLDivElement>('card')
const container = inject<Readonly<Ref<HTMLDivElement>>>('container')

const { style, isDragging } = useDraggable(cardEl, {
  initialValue: props.position,

  disabled: false,

  // Make sure the card is always in the bounds of the container
  containerElement: container,
})

// Calculate the offset based on the parent card
const offset = computed(() => {
  return `left: -${props.parentCard.x}px; top: -${props.parentCard.z}px;`
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
    ref="card"
    :style="style"
    class="absolute w-[70px] h-[100px] select-none"
    :class="{
      'z-15 transition-transform pointer-events-none': isDragging,
    }"
  >
    <div
      :class="{ absolute: isDragging }"
      :style="offset"
    >
      <Component
        :is="customComponentName"
        :board-card="boardCard"
      />
    </div>
  </div>
</template>
