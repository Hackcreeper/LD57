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
  changeBgImg()
})

await cardStore.init()

const { board } = storeToRefs(boardStore)

const bgImgs = Array.from({ length: 12 }, (_, i) => `space-${i + 1}.jpg`)
let remainingImgs = [...bgImgs]
const currentBgImg = ref('')

function getRandomImg(): string {
  if (remainingImgs.length === 0) {
    remainingImgs = [...bgImgs]
  }

  const index = Math.floor(Math.random() * remainingImgs.length)
  const selected = remainingImgs[index]
  remainingImgs.splice(index, 1)
  return `url('/background-images/${selected}')`
}

function changeBgImg() {
  currentBgImg.value = getRandomImg()
}
</script>

<template>
  <div
    ref="container"
    class="w-full  bg-image select-none"
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

<style scoped>
.bg-image {
  background-color: #000000;
  background-size: cover;
  background-position: center;
}
</style>
