import type { CardsCollectionItem } from '@nuxt/content'

export const useCardStore = defineStore('card', () => {
  const cards = ref<CardsCollectionItem[]>([])

  const init = async () => {
    const { data } = await useAsyncData('cards', () => {
      return queryCollection('cards').all()
    })

    cards.value = data.value ?? []
  }

  const getRandomCard = (): CardsCollectionItem => {
    return cards.value[Math.floor(Math.random() * cards.value.length)]
  }

  return {
    init,
    getRandomCard,
    cards: readonly(cards),
  }
})
