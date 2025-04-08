<script setup lang="ts">
const imgEl = useTemplateRef<HTMLImageElement>('img')

const { playState } = useAnimate(imgEl, [{ opacity: 0 }, { opacity: 1 }], {
  duration: 2000,
})

watch(playState, (state) => {
  if (state !== 'finished') {
    return
  }

  navigateTo('/LD57/game', { external: true })
})
</script>

<template>
  <img
    ref="img"
    src="/export.png"
    class="!w-full !h-auto"
  >
</template>
