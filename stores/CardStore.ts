import type { CardsCollectionItem } from '@nuxt/content'

export const useCardStore = defineStore('card', () => {
  const cards = ref<CardsCollectionItem[]>([])

  const init = async () => {
    const { data } = await useAsyncData('cards', () => {
      return queryCollection('cards').all()
    })

    cards.value = data.value ?? []
  }

  const getCardByIdentifier = (identifier: string): CardsCollectionItem | undefined => {
    return cards.value.find(card => card.identifier === identifier)
  }

  const getRandomCard = (): CardsCollectionItem => {
    return cards.value[Math.floor(Math.random() * cards.value.length)]
  }

  return {
    init,
    getRandomCard,
    getCardByIdentifier,
    cards: readonly(cards),
  }
})
