<script lang="ts" setup>
import type { BoardCard } from '~/types/Board'

const cardStore = useCardStore()

defineProps<{
  boardCard: BoardCard
}>()
</script>

<template>
  <UPopover
    mode="hover"
    :open-delay="400"
    arrow
  >
    <ObjectCardSingle
      v-if="!boardCard.stackedCard && !boardCard.parentCard"
      :board-card="boardCard"
    />
    <ObjectCardDeck
      v-else-if="boardCard.stackedCard"
      :board-card="boardCard"
    />

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
