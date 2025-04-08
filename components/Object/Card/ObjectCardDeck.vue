<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

// Stores
const boardStore = useBoardStore()
const levelStore = useLevelStore()
const cardStore = useCardStore()

// Handle dragging card decks
const hoveringOverBottomCard = ref(false)
const deckEl = useTemplateRef<HTMLDivElement>('deck')
const { container } = storeToRefs(levelStore)

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
    if (!props.boardCard.stackedCard) return // Can never happen
    boardStore.setCardPosition(props.boardCard.stackedCard, position.x, position.y + DeckStackPadding)
  },
})

// This allow to have special vue components for cards
const { getVisualComponentName } = useCardVisual()
</script>

<template>
  <div
    ref="deck"
    class="absolute"
    :class="{ 'z-10 scale-90 transition-transform': isDragging }"
    :style="style"
  >
    <UProgress
      v-if="boardCard.currentInteraction && !boardCard.currentInteraction.showHealthInsteadOfTime"
      :model-value="boardCard.interactionProgress ?? 0"
      class="absolute -top-4"
      color="neutral"
    />
    <UProgress
      v-else-if="boardCard.card.health && boardCard.currentInteraction && boardCard.currentInteraction.showHealthInsteadOfTime"
      class="absolute -top-4"
      :model-value="boardCard.currentHealth"
      :max="boardCard.card.health"
    />
    <UPopover
      mode="hover"
      :open-delay="400"
      arrow
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

    <ObjectCardDeckStacked
      v-if="boardCard.stackedCard"
      :board-card="boardCard.stackedCard"
      :parent-card="boardCard"
    />
  </div>
</template>
