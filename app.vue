<script setup lang="ts">
const cardStore = useCardStore()
const boardStore = useBoardStore()

const container = templateRef<HTMLDivElement>('container')
provide('container', container)

await cardStore.init()

const { board } = storeToRefs(boardStore)

// Temporary until real cards are added
boardStore.addCard(cardStore.getRandomCard(), 100, 20)
boardStore.addCard(cardStore.getRandomCard(), 400, 20)
boardStore.addCard(cardStore.getRandomCard(), 400, 400)
</script>

<template>
  <div
    ref="container"
    class="w-screen aspect-1/1 bg-zinc-700"
  >
    <template
      v-for="card in board"
      :key="card.uniqueId"
    >
      <ObjectCard :board-card="card" />
    </template>
  </div>
</template>
