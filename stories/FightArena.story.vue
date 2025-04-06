<script setup lang="ts">
import { useDemoCards } from './composables/useDemoCards'

const { spawn } = useDemoCards()

const cardStore = useCardStore()
await cardStore.init()

spawn(['worker', 'soldier', 'soldier-instructor', 'baby', 'pirate', 'pirate'])
</script>

<template>
  <div class="relative h-250">
    <LevelBoard :fixed-aspect="false" />
  </div>
</template>
