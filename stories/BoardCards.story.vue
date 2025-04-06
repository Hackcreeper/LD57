<script setup lang="ts">
const cardStore = useCardStore()
const boardStore = useBoardStore()
const levelStore = useLevelStore()

await cardStore.init()

const { cards } = storeToRefs(cardStore)
const { container } = storeToRefs(levelStore)

const index = ref(1)
const padding = 20
const cardWidth = 70
const cardHeight = 100

watchOnce(container, () => {
  const maxWidth = container.value?.clientWidth ?? 100
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
onMounted(() => {
})
</script>

<template>
  <div class="relative">
    <LevelBoard />
  </div>
</template>
