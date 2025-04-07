<script setup lang="ts">
import { CardWidth, CardHeight } from '#imports'

const cardStore = useCardStore()
const eventStore = useEventStore()
const boardStore = useBoardStore()
const levelStore = useLevelStore()
const progressStore = useProgressStore()

await cardStore.init()
await eventStore.init()
await progressStore.init()

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
  addPercentage('soldier', 10, 75)

  addPercentage('rocket', 50, 50)
  addPercentage('trade-link-broken', 90, 75)

  addPercentage('fuel', 35, 25, 3)
  addPercentage('money', 50, 25, 400)
  addPercentage('metal', 50, 25, 5)

  addPercentage('flux-generator', 55, 80)
  addPercentage('radar', 40, 100)
  addPercentage('radar', 40, 100)
})
</script>

<template>
  <main>
    <UiJourneyBar />
    <LevelBoard />
  </main>
</template>
