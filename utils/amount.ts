import type { CardsCollectionItem } from '@nuxt/content'

export const getAmount = (amount: CardsCollectionItem['interactions'][0]['actions'][0]['amount']): number => {
  assert(amount !== undefined, 'Amount is required!')

  return typeof amount === 'number'
    ? amount
    : (amount?.min ?? undefined) !== undefined && (amount?.max ?? undefined) !== undefined
        ? getRandomIntInclusive(amount.min, amount.max)
        : 0
}
