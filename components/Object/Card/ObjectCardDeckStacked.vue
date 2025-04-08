<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
  parentCard: BoardCard
}>()

// Usage of stores
const boardStore = useBoardStore()
const levelStore = useLevelStore()
const cardStore = useCardStore()

// Handle dragging card decks
const movedOnce = ref(false)
const cardEl = useTemplateRef<HTMLDivElement>('card')
const { container } = storeToRefs(levelStore)

const { style, isDragging } = useDraggable(cardEl, {
  initialValue: { x: 0, y: DeckStackPadding },

  // Make sure the card is always in the bounds of the container
  containerElement: container,

  // We need to remember that we moved once to calculate the offset
  // required by stacking
  onMove: () => {
    movedOnce.value = true
  },

  // As soon as we start dragging, cancel the interaction
  onStart: () => {
    boardStore.cancelInteraction(props.boardCard)
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
  <UPopover
    mode="hover"
    :open-delay="400"
    arrow
  >
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

    <template #content>
      <div
        class="w-[300px] !p-4"
      >
        <h2
          class="!text-lg !font-bold"
          v-text="boardCard.card.label"
        />
        <p v-text="boardCard.card.description" />

        <template v-if="boardCard.card.interactions?.length">
          <br><hr><br>

          <p class="!text-sm">
            Can interact with:
          </p>

          <div class="!mt-1 !text-gray-200 !space-x-2">
            <Icon
              v-for="interaction in boardCard.card.interactions"
              :key="interaction.card"
              size="2em"
              :name="cardStore.getCardByIdentifier(interaction.card)?.icon"
            />
          </div>
        </template>
      </div>
    </template>
  </UPopover>
</template>
