<script lang="ts" setup>
import type { BoardCard } from '~/types/Board'

defineProps<{
  boardCard: BoardCard
}>()
</script>

<template>
  <ObjectCardVisualDefault
    :board-card="boardCard"
    class="rounded-xl !bg-amber-400"
  >
    <template #icon>
      Icon
    </template>
  </ObjectCardVisualDefault>
</template>
