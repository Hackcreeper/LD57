<template>
  <div class="!mt-20 container !mx-auto text-center text-green-200">
    <h1 class="!text-8xl !font-bold">
      You won!
    </h1>

    <p class="text-2xl !mt-4">
      But unfortunately, you are lost in the depth of space. Well, someone is probably sad about that 😰. Anyway, thanks for playing!
    </p>

    <UButton
      class="!mt-8 !bg-neutral-300 !py-4 !px-10 cursor-pointer !rounded-md !text-neutral-900"
      color="neutral"
      @click="navigateTo('/LD57', { external: true })"
    >
      Retry
    </UButton>
  </div>
</template>
