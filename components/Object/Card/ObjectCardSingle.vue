<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

// Use stores & composables
const boardStore = useBoardStore()
const levelStore = useLevelStore()
const cardStore = useCardStore()
const { activeCard } = storeToRefs(boardStore) // This is the card, the user is currently hovering above

const { hasInteractionWith, interact } = useInteraction(props.boardCard)

// Handle dragging single cards
const originalPosition = ref({ x: 0, y: 0 })
const cardEl = useTemplateRef<HTMLDivElement>('card')
const { container } = storeToRefs(levelStore)

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
    interact(card)
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

const { play, playState, finish } = useAnimate(cardEl, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
  immediate: false,
  duration: 100,
})

onMounted(() => {
  if (props.boardCard.isNew) {
    play()
    return
  }

  finish()
})

watch(playState, (state) => {
  if (state !== 'finished') {
    return
  }

  boardStore.markCardAsOld(props.boardCard)
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
      <UProgress
        v-if="boardCard.timerProgress !== undefined"
        :model-value="100 - (boardCard.timerProgress ?? 0)"
        class="absolute -top-4"
        color="neutral"
      />
      <Component
        :is="getVisualComponentName(boardCard.card)"
        :board-card="boardCard"
      />
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
