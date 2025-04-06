<script setup lang="ts">
const cardStore = useCardStore()
const boardStore = useBoardStore()

const container = templateRef<HTMLDivElement>('container')
provide('container', container)

await cardStore.init()

const { board } = storeToRefs(boardStore)

// Temporary until real cards are added
boardStore.addCard(cardStore.getCardByIdentifier('worker') ?? cardStore.getRandomCard(), 100, 100)
boardStore.addCard(cardStore.getCardByIdentifier('worker') ?? cardStore.getRandomCard(), 100, 300)
boardStore.addCard(cardStore.getCardByIdentifier('asteroid') ?? cardStore.getRandomCard(), 400, 200)
boardStore.addCard(cardStore.getCardByIdentifier('asteroid') ?? cardStore.getRandomCard(), 480, 400)
boardStore.addCard(cardStore.getCardByIdentifier('duck') ?? cardStore.getRandomCard(), 750, 300)
boardStore.addCard(cardStore.getCardByIdentifier('trade') ?? cardStore.getRandomCard(), 850, 50)
boardStore.addCard(cardStore.getCardByIdentifier('money') ?? cardStore.getRandomCard(), 850, 420)
boardStore.addCard(cardStore.getCardByIdentifier('money') ?? cardStore.getRandomCard(), 950, 420)
</script>

<template>
  <div
    ref="container"
    class="w-screen aspect-16/9 bg-pattern select-none"
  >
    <template
      v-for="card in board"
      :key="card.uniqueId"
    >
      <ObjectCard :board-card="card" />
    </template>
  </div>
</template>

<style scoped>
.bg-pattern {
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%236200ff' fill-opacity='0.32'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
