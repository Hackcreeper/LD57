export const useLevelStore = defineStore('level', () => {
  const container = ref<HTMLDivElement>()

  const setContainer = (newContainer: HTMLDivElement) => {
    container.value = newContainer
  }

  return {
    container,
    setContainer,
  }
})
