<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

defineProps<{
  boardCard: BoardCard
}>()
</script>

<template>
  <div class="bg-white w-full h-full">
    <slot name="icon">
      <Icon
        :name="boardCard.card.icon"
        size="3em"
      />
    </slot>
    <h2 v-text="boardCard.card.label" />
  </div>
</template>
