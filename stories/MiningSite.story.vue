<script setup lang="ts">
import { useDemoCards } from './composables/useDemoCards'

const { spawn } = useDemoCards()

const cardStore = useCardStore()
await cardStore.init()

spawn(['worker', 'worker', 'miner', 'miner-instructor', 'asteroid-field', 'asteroid-field'])
</script>

<template>
  <div class="relative">
    <LevelBoard />
  </div>
</template>
