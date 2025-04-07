<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

const price = computed(() => {
  return `${props.boardCard.buyableAmount} -> $${props.boardCard.buyablePrice}`
})
</script>

<template>
  <ObjectCardVisualDefault :board-card="boardCard">
    <template #icon>
      <div
        v-if="boardCard.buyableCard"
        class="text-black !mt-1 flex justify-center"
      >
        <Icon
          :name="boardCard.buyableCard.icon"
          :style="'color:' + boardCard.buyableCard.iconColor"
          size="3em"
        />
      </div>
    </template>
    <template #amount>
      <div
        class="text-center block text-black text-xs"
        v-text="price"
      />
    </template>
  </ObjectCardVisualDefault>
</template>
