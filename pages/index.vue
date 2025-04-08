<script setup lang="ts">
const cardStore = useCardStore()
await cardStore.init()

const { cards } = storeToRefs(cardStore)
</script>

<template>
  <main class="container !mx-auto !mt-20 flex">
    <div class="flex-1">
      <h1 class="!text-5xl font-semibold flex items-center gap-3">
        <Icon
          name="material-symbols:rocket-launch"
          size=".8em"
        />
        Splorer
      </h1>
      <p class="!text-xl !mt-4">
        A game about the depth of space made by <br><a
          href="https://github.com/jkniest"
          target="_blank"
          class="!text-primary-300"
        >Jordan Kniest</a> and <a
          href="https://github.com/hacktier"
          target="_blank"
          class="!text-primary-300"
        >Markus Kapp</a>.
      </p>

      <UButton
        class="!mt-8 !bg-primary-300 !py-4 !px-10 cursor-pointer !rounded-md !text-neutral-900"
        @click="navigateTo('/LD57/splash', { external: true })"
      >
        Start Game
      </UButton>
    </div>
    <div class="flex-1 grid grid-cols-11 gap-4 rotate-30 -translate-x-24 translate-y-35">
      <Icon
        v-for="card in cards"
        :key="card.identifier"
        :name="card.icon"
        size="3em"
        class="!text-gray-50/50"
      />
    </div>
  </main>
</template>
