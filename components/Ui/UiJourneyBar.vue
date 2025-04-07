<script setup lang="ts">
const progressStore = useProgressStore()
const { events } = storeToRefs(progressStore)
</script>

<template>
  <div class="h-10 bg-black !border-b-2 !border-b-secondary-300 fixed left-0 right-0 top-0 z-20">
    <div class="absolute border-dashed !border-b-2 !border-b-secondary-50/30 h-2  top-3 left-0 right-0" />
    <div class="h-full flex items-center z-10">
      <Icon
        name="material-symbols:rocket-launch"
        size="1.5em"
        class="rotate-45 absolute z-40 bg-white transition-all duration-1000"
        :style="`left: ${progressStore.progress}% `"
      />

      <Icon
        v-for="event in events"
        :key="event.uniqueId"
        :name="event.revealed ? event.event.icon : 'material-symbols:help'"
        class="absolute"
        :class="{
          '!bg-gray-300/60': !event.revealed,
          'bg-yellow-300': event.event.type === 'neutral',
          'bg-green-300': event.event.type === 'positive',
          'bg-red-300': event.event.type === 'negative',
        }"
        :style="`left: min(${event.progress}%, calc(100% - 1em))`"
        size="1.5em"
      />
    </div>
  </div>
</template>
