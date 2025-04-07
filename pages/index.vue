<script setup lang="ts">
import { CardWidth, CardHeight } from '#imports'

const cardStore = useCardStore()
const boardStore = useBoardStore()
const levelStore = useLevelStore()

await cardStore.init()

const { container } = storeToRefs(levelStore)

function addPercentage(identifier: string, x: number, y: number, amount: number | undefined = undefined) {
  assert(container.value !== undefined, 'Container not found!')

  // x is a percentage and I need the absolute value in regards to the container width
  const xAbsolute = (x * container.value.clientWidth / 100) - CardWidth / 2
  const yAbsolute = (y * container.value.clientHeight / 100) - CardHeight / 2

  boardStore.addCard(cardStore.getCardByIdentifier(identifier) ?? cardStore.getRandomCard(), xAbsolute, yAbsolute, false, amount)
}

watchOnce(container, () => {
  addPercentage('worker', 10, 25)
  addPercentage('worker', 10, 75)

  addPercentage('navcom-broken', 90, 25)
  addPercentage('hyperdrive', 90, 50)
  addPercentage('trade-link-broken', 90, 75)

  addPercentage('fuel', 35, 15, 6)
  addPercentage('fuel', 65, 15, 5)

  addPercentage('asteroid', 45, 50)
  addPercentage('asteroid', 55, 50)
})
</script>

<template>
  <LevelBoard />
</template>
