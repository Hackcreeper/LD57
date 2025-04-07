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
  changeBackground()
})

await cardStore.init()

const { board } = storeToRefs(boardStore)

const allImages = Array.from({ length: 12 }, (_, i) => `space-${i + 1}.jpg`)
let remainingImages = [...allImages]
const currentBackground = ref('')

function getRandomImage(): string {
  if (remainingImages.length === 0) {
    remainingImages = [...allImages]
  }

  const index = Math.floor(Math.random() * remainingImages.length)
  const selected = remainingImages[index]
  remainingImages.splice(index, 1)
  return `url('/background-images/${selected}')`
}

function changeBackground() {
  console.log('changeBackground')
  currentBackground.value = getRandomImage()
}
</script>

<template>
  <div
    ref="container"
    class="w-full  bg-image select-none"
    :class="{ 'aspect-16/9': fixedAspect, 'h-full': !fixedAspect }"
    :style="{ backgroundImage: currentBackground }"
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
