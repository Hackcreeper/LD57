<script setup lang="ts">
import { useDemoCards } from './composables/useDemoCards'

const { spawn } = useDemoCards()

const cardStore = useCardStore()
const boardStore = useBoardStore()
await cardStore.init()

const { board } = storeToRefs(boardStore)
watchOnce(boardStore.board as never, () => {
  for (let i = 0; i < board.value.length; i++) {
    if (!board.value[i].amount) continue

    board.value[i].amount = 2000
  }
})

spawn(['money', 'merchant', 'trade', 'trade', 'trade', 'trade', 'metal', 'fuel'])
</script>

<template>
  <div class="relative">
    <LevelBoard />
  </div>
</template>
