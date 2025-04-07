<script setup lang="ts">
withDefaults(defineProps<{
  fixedAspect?: boolean
}>(), {
  fixedAspect: true,
})

const cardStore = useCardStore()
const boardStore = useBoardStore()
const levelStore = useLevelStore()

const container = useTemplateRef('container')
onMounted(() => {
  levelStore.setContainer(container.value)
  levelStore.changeBgImg()
})

await cardStore.init()

const { board } = storeToRefs(boardStore)
const { currentBgImg } = storeToRefs(levelStore)
</script>

<template>
  <div
    ref="container"
    class="w-full bg-center bg-cover bg-black select-none"
    :class="{ 'aspect-16/9': fixedAspect, 'h-full': !fixedAspect }"
    :style="{ backgroundImage: currentBgImg }"
  >
    <template
      v-for="card in board"
      :key="card.uniqueId"
    >
      <ObjectCard :board-card="card" />
    </template>
  </div>
</template>
