<script setup lang="ts">
import type { BoardCard } from '~/types/Board'

const props = defineProps<{
  boardCard: BoardCard
}>()

const text = useTemplateRef<HTMLElement>('text')

const maxWidth = 70 - 16

const styleCardHeader = computed(() => {
  return {
    person: 'bg-sky-400',
    resource: 'bg-zinc-500',
    enemy: 'bg-red-400',
    merchant: 'bg-amber-400',
    building: 'bg-[#D6A77A]',
    event: 'bg-green-400',
    limitedUsage: 'bg-purple-400',
  }[props.boardCard.card.type as string] ?? 'bg-stone-200'
})

const styleCardBody = computed(() => {
  return {
    person: 'bg-sky-200',
    resource: 'bg-zinc-300',
    enemy: 'bg-red-200',
    merchant: 'bg-amber-200',
    building: 'bg-[#F3D9B1]',
    event: 'bg-green-200',
    limitedUsage: 'bg-purple-200',
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
    class="w-full h-full rounded-md border border-black card-font"
    :class="styleCardBody"
  >
    <slot name="label">
      <div
        class="flex rounded-t-md border-b-1 text-black h-7 justify-center items-center"
        :class="styleCardHeader"
      >
        <h2
          ref="text"
          class="text-center"
          :class="boardCard.card.type === 'resource' ? 'text-white' : ''"
          v-text="boardCard.card.label"
        />
      </div>
    </slot>

    <div class="flex justify-center">
      <div>
        <slot name="icon">
          <div
            class="text-black justify-center !mt-2"
          >
            <Icon
              :name="boardCard.card.icon"
              :style="'color:' + boardCard.card.iconColor"
              size="3em"
            />
          </div>
        </slot>
        <slot name="health">
          <UProgress
            v-if="boardCard.card.health"
            class="!mt-1"
            :model-value="boardCard.currentHealth"
            :max="boardCard.card.health"
          />
        </slot>
        <slot name="amount">
          <UProgress
            v-if="boardCard.cooldownRemainingSeconds && boardCard.cooldownRemainingSeconds > 0"
            :model-value="100 - (((boardCard.cooldownRemainingSeconds ?? 0) / (boardCard.card.cooldown ?? 1)) * 100)"
            color="neutral"
          />
          <UProgress
            v-if="boardCard.amount !== undefined && boardCard.card.container"
            class="!mt-1"
            :model-value="boardCard.amount"
            :max="boardCard.card.containerMax"
            color="secondary"
          />
          <div
            v-else-if="boardCard.amount"
            class="text-center block text-black -translate-y-1 text-xs"
            v-text="boardCard.amount"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
