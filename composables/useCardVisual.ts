import type { CardsCollectionItem } from '@nuxt/content'

export const useCardVisual = () => {
  const specialComponents = import.meta.glob('~/components/Object/Card/Visual/*.vue')

  const getVisualComponentName = (card: CardsCollectionItem): string => {
    const uppercasedId = card.identifier.charAt(0).toUpperCase() + card.identifier.slice(1)
    const fullString = `/components/Object/Card/Visual/ObjectCardVisual${uppercasedId}.vue`
    if (specialComponents[fullString]) {
      return `ObjectCardVisual${uppercasedId}`
    }

    return `ObjectCardVisualDefault`
  }

  return {
    getVisualComponentName,
  }
}
