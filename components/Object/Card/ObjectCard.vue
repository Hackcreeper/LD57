<script lang="ts" setup>
import type { BoardCard } from '~/types/Board'

defineProps<{
  boardCard: BoardCard
}>()
</script>

<template>
  <ObjectCardSingle
    v-if="boardCard.stackedCards.length === 0 && !boardCard.parentCard"
    :board-card="boardCard"
  />
  <ObjectCardDeck
    v-else-if="boardCard.stackedCards.length > 0"
    :board-card="boardCard"
  />
</template>
