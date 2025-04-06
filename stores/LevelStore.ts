export const useLevelStore = defineStore('level', () => {
  const container = ref<HTMLDivElement>()

  const setContainer = (newContainer: HTMLDivElement | null) => {
    assert(newContainer !== null, 'Container not found!')

    container.value = newContainer
  }

  return {
    container,
    setContainer,
  }
})
