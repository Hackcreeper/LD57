<script setup lang="ts">
import { useDemoCards } from './composables/useDemoCards'

const { spawn } = useDemoCards()

const cardStore = useCardStore()
await cardStore.init()

spawn(['worker', 'worker', 'miner', 'miner-instructor', 'helmsman', 'asteroid-field', 'asteroid-field', 'asteroid', 'asteroid'])
</script>

<template>
  <div class="relative h-250">
    <LevelBoard :fixed-aspect="false" />
  </div>
</template>
