<script setup lang="ts">
import { useDemoCards } from './composables/useDemoCards'

const { spawn } = useDemoCards()

const cardStore = useCardStore()
await cardStore.init()
const { cards } = storeToRefs(cardStore)

spawn(cards.value.map(c => c.identifier))
</script>

<template>
  <div class="relative h-200">
    <LevelBoard :fixed-aspect="false" />
  </div>
</template>
