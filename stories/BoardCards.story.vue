<script setup lang="ts">
const cardStore = useCardStore()
const boardStore = useBoardStore()

const container = templateRef<HTMLDivElement>('container')
provide('container', container)

await cardStore.init()

const { board } = storeToRefs(boardStore)
const { cards } = storeToRefs(cardStore)

const index = ref(1)
const padding = 20
const cardWidth = 70
const cardHeight = 100

onMounted(() => {
  const maxWidth = container.value.clientWidth
  let row = 0
  let column = 0
  cards.value.forEach((card) => {
    if ((index.value * (cardWidth + padding) / (row + 1)) > maxWidth) {
      column = 0
      row++
    }

    const x = padding + column++ * (cardWidth + padding)
    const y = padding + row * (cardHeight + padding)

    boardStore.addCard(card, x, y)
    index.value++
  })
})
</script>

<template>
  <div
    ref="container"
    class="bg-pattern h-100 relative"
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
