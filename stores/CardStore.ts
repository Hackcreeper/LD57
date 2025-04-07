import type { CardsCollectionItem } from '@nuxt/content'

export const CardWidth = 70
export const CardHeight = 100
// w-[70px] h-[100px]
export const CardClasses = `w-[${CardWidth}px] h-[${CardHeight}px]`
export const DeckStackPadding = 28

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

  const getRandomBuyableCard = (): CardsCollectionItem => {
    const filteredCards = cards.value.filter(card => card.buyable)

    return filteredCards[Math.floor(Math.random() * filteredCards.length)]
  }

  return {
    init,
    getRandomCard,
    getRandomBuyableCard,
    getCardByIdentifier,
    cards,
  }
})
