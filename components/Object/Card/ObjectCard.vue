<script lang="ts" setup>
import type { BoardCard } from '~/types/Board'

defineProps<{
  boardCard: BoardCard
}>()
</script>

<template>
  <ObjectCardSingle
    v-if="!boardCard.stackedCard && !boardCard.parentCard"
    :board-card="boardCard"
  />
  <ObjectCardDeck
    v-else-if="boardCard.stackedCard"
    :board-card="boardCard"
  />
</template>
