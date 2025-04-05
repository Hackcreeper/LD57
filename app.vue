<script setup lang="ts">
import { CardHeight, CardWidth } from './util/consts'

const cardStore = useCardStore()
const boardStore = useBoardStore()

await cardStore.init()

const { board } = storeToRefs(boardStore)

// Temporary until real cards are added
boardStore.addCard(cardStore.getRandomCard(), 0, 0)
boardStore.addCard(cardStore.getRandomCard(), CardWidth + 1, 0)
boardStore.addCard(cardStore.getRandomCard(), CardWidth + 1, CardHeight + 1)
</script>

<template>
  <div class="w-screen aspect-10/10">
    <TresCanvas
      clear-color="black"
      preset="realistic"
    >
      <Stars />
      <TresPerspectiveCamera
        :fov="60"
        :position="[10, -20, 0]"
        :rotation="[1.5708, 0.4, 1.5708]"
      />
      <Suspense
        v-for="card in board"
        :key="card.uniqueId"
      >
        <ObjectCard :card="card" />
      </Suspense>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>
