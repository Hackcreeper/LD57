<script setup lang="ts">
const cardStore = useCardStore()
await cardStore.init()
await eventStore.init()
await progressStore.init()

const { container } = storeToRefs(levelStore)

function addPercentage(identifier: string, x: number, y: number, amount: number | undefined = undefined) {
  assert(container.value !== undefined, 'Container not found!')

  // x is a percentage and I need the absolute value in regards to the container width
  const xAbsolute = (x * container.value.clientWidth / 100) - CardWidth / 2
  const yAbsolute = (y * container.value.clientHeight / 100) - CardHeight / 2

  boardStore.addCard(cardStore.getCardByIdentifier(identifier) ?? cardStore.getRandomCard(), xAbsolute, yAbsolute, true, amount)
}

watchOnce(container, () => {
  addPercentage('worker', 10, 25)
  addPercentage('soldier', 10, 75)

  addPercentage('rocket', 50, 50)
  addPercentage('trade-link', 90, 75)

  addPercentage('fuel', 35, 25, 3)
  addPercentage('money', 50, 25, 400)
  addPercentage('metal', 65, 25, 5)

  addPercentage('flux-generator', 50, 80)
})

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
        @click="navigateTo('splash', { external: true })"
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
