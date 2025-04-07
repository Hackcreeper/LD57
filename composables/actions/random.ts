import type { CardsCollectionItem } from '@nuxt/content'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'
import { getRandomIntInclusive } from '~/utils/randomIntInclusive'

export const random: Action = (action: CardsCollectionItem['interactions'][0]['actions'][0], baseCard: BoardCard, interactingCard: BoardCard) => {
  const { runActions } = useAction()

  assert(action.actions !== undefined, 'Action `random` requires the `actions` property to be set!')

  // Choose a random action from the array
  const randomAction = action.actions[getRandomIntInclusive(0, action.actions.length - 1)]

  // Run the action
  runActions([randomAction], baseCard, interactingCard)
}
