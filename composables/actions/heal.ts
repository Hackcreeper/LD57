import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'
import { getRandomIntInclusive } from '~/utils/randomIntInclusive'

export const heal: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], _baseCard: BoardCard, interactingCard: BoardCard) => {
  assert(action.amount !== undefined, 'Action `heal` requires the `amount` property to be set!')
  assert(interactingCard.currentHealth !== null, 'Action `heal` requires the interacting person to be alive!')
  assert(interactingCard.card.health !== undefined, 'Action `heal` requires the `health` to be set!')

  const amount = typeof action.amount === 'number'
    ? action.amount
    : (action.amount?.min ?? undefined) !== undefined && (action.amount?.max ?? undefined) !== undefined
        ? getRandomIntInclusive(action.amount.min, action.amount.max)
        : 0

  const activeCard: BoardCard = _baseCard.card.identifier === 'medic' || _baseCard.card.identifier === 'medic-instructor'
    ? interactingCard
    : _baseCard

  if (!activeCard.currentHealth || !activeCard.card.health) return // Can never happen because of asserts

  if ((activeCard.currentHealth + amount) >= activeCard.card.health) {
    activeCard.currentHealth = activeCard.card.health
    return
  }

  activeCard.currentHealth = Math.max(0, activeCard.currentHealth + amount)
}
