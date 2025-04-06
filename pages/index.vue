<script setup lang="ts">
const cardStore = useCardStore()
const boardStore = useBoardStore()

await cardStore.init()

boardStore.addCard(cardStore.getCardByIdentifier('worker') ?? cardStore.getRandomCard(), 100, 100, false)
boardStore.addCard(cardStore.getCardByIdentifier('worker') ?? cardStore.getRandomCard(), 100, 300, false)
boardStore.addCard(cardStore.getCardByIdentifier('asteroid') ?? cardStore.getRandomCard(), 400, 200, false)
boardStore.addCard(cardStore.getCardByIdentifier('asteroid') ?? cardStore.getRandomCard(), 480, 400, false)
boardStore.addCard(cardStore.getCardByIdentifier('duck') ?? cardStore.getRandomCard(), 750, 300, false)
boardStore.addCard(cardStore.getCardByIdentifier('trade') ?? cardStore.getRandomCard(), 850, 50, false)
boardStore.addCard(cardStore.getCardByIdentifier('money') ?? cardStore.getRandomCard(), 850, 420, false)
boardStore.addCard(cardStore.getCardByIdentifier('money') ?? cardStore.getRandomCard(), 950, 420, false)
</script>

<template>
  <LevelBoard />
</template>
