<script lang="ts" setup>
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

// This refs are used to define was is draggable and in which bounds can be dragged
const cardEl = useTemplateRef<HTMLDivElement>('card')
const container = inject<Readonly<Ref<HTMLDivElement>>>('container')

const { style } = useDraggable(cardEl, {
  initialValue: { x: props.boardCard.x, y: props.boardCard.z },
  containerElement: container,
})

// This allow to have special vue components for cards
const specialComponents = import.meta.glob('~/components/Object/Card/Visual/*.vue')
const customComponentName = computed(() => {
  const fullString = `/components/Object/Card/Visual/ObjectCardVisual${props.boardCard.card.label}.vue`
  if (specialComponents[fullString]) return `ObjectCardVisual${props.boardCard.card.label}`

  return `ObjectCardVisualDefault`
})
</script>

<template>
  <div
    ref="card"
    :style="style"
    class="w-[70px] h-[100px] fixed select-none"
  >
    <Component
      :is="customComponentName"
      :board-card="boardCard"
    />
  </div>
</template>
