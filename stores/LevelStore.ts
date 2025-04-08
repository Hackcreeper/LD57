export const useLevelStore = defineStore('level', () => {
  const container = ref<HTMLDivElement>()
  const bgImgs = Array.from({ length: 12 }, (_, i) => `space-${i + 1}.jpg`)

  let remainingImgs = [...bgImgs]
  const currentBgImg = ref('')

  const setContainer = (newContainer: HTMLDivElement | null) => {
    assert(newContainer !== null, 'Container not found!')

    container.value = newContainer
  }

  const getRandomImg = (): string => {
    if (remainingImgs.length === 0) {
      remainingImgs = [...bgImgs]
    }

    const index = Math.floor(Math.random() * remainingImgs.length)
    const selected = remainingImgs[index]
    remainingImgs.splice(index, 1)
    return `url('/LD57/background-images/${selected}')`
  }

  const changeBgImg = () => {
    currentBgImg.value = getRandomImg()
  }

  return {
    container,
    setContainer,
    changeBgImg,
    currentBgImg,
  }
})
