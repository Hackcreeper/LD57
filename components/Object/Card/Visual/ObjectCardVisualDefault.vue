<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

const currentHealth = ref(props.boardCard.card.health)
const maxWidth = 70 - 16

const text = ref<HTMLElement | null>(null)

const styleCardHeader = computed(() => {
  switch (props.boardCard.card.type) {
    case 'person': return 'bg-zinc-400'
    case 'resource': return 'bg-sky-200'
    case 'enemy': return 'bg-red-400'
    case 'merchant' : return 'bg-amber-300'
    default: return 'bg-stone-200'
  }
})
const styleCardBody = computed(() => {
  switch (props.boardCard.card.type) {
    case 'person': return 'bg-zinc-200'
    case 'resource': return 'bg-sky-100'
    case 'enemy': return 'bg-red-300'
    case 'merchant' : return 'bg-amber-200'
    default: return 'bg-stone-100'
  }
})
onMounted(() => {
  if (!text.value) return
  const textWidth = text.value.scrollWidth

  if (textWidth > maxWidth) {
    text.value.style.fontSize = `${Math.floor(maxWidth / textWidth * 100)}%`
  }
})
</script>

<template>
  <div
    class="w-full h-full rounded-md border border-black"
    :class="styleCardBody"
  >
    <slot name="label">
      <div
        class="flex rounded-t-md border-b-1 text-black h-6 justify-center items-center"
        :class="styleCardHeader"
      >
        <h2
          ref="text"
          class="text-nowrap"
          v-text="boardCard.card.label"
        />
      </div>
    </slot>
    <div class="flex justify-center">
      <div class="flex-col">
        <slot name="icon">
          <div
            class="text-black !mt-2"
          >
            <Icon
              :name="boardCard.card.icon"
              size="3em"
            />
          </div>
        </slot>
        <slot name="health">
          <UProgress
            v-if="boardCard.card.health"
            v-model="currentHealth"
            :max="boardCard.card.health"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
