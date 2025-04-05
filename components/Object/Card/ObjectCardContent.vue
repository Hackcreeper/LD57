<script setup lang="ts">
import type { CardsCollectionItem } from '@nuxt/content'

defineProps<{
  card: CardsCollectionItem
}>()
</script>

<template>
  <div
    class="text-gray-700 flex flex-col items-center mt-4 gap-3 pointer-events-none select-none"
  >
    <Icon
      :name="card.icon"
      size="3em"
    />
    <h1 class="text text-center text-black">
      {{ card.label }}
    </h1>
  </div>
</template>
