<script lang="ts" setup>
import type { BoardCard } from '~/types/Board'

defineProps<{
  boardCard: BoardCard
}>()
</script>

<template>
  <ObjectCardVisualDefault
    :board-card="boardCard"
    class="rounded-xl"
  >
    <template #icon>
      <Icon
        class="!mt-2 bg-amber-500"
        :name="boardCard.card.icon"
        size="3em"
      />
    </template>
  </ObjectCardVisualDefault>
</template>
