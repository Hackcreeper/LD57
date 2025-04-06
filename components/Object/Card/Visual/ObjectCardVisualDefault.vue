<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

const text = useTemplateRef<HTMLElement>('text')

const maxWidth = 70 - 16

const styleCardHeader = computed(() => {
  return {
    person: 'bg-zinc-400',
    resource: 'bg-sky-300',
    enemy: 'bg-red-400',
    merchant: 'bg-amber-300',
  }[props.boardCard.card.type as string] ?? 'bg-stone-200'
})

const styleCardBody = computed(() => {
  return {
    person: 'bg-zinc-200',
    resource: 'bg-sky-100',
    enemy: 'bg-red-300',
    merchant: 'bg-amber-200',
  }[props.boardCard.card.type as string] ?? 'bg-stone-100'
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
            :model-value="boardCard.currentHealth"
            :max="boardCard.card.health"
          />
        </slot>
        <slot name="amount">
          <div
            v-if="boardCard.amount"
            class="text-center block text-black -translate-y-1 text-xs"
            v-text="boardCard.amount"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
