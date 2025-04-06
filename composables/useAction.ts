import type { CardsCollectionItem } from '@nuxt/content'
import { spawn } from './actions/spawn'
import { damage } from './actions/damage'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

const allActions: { [key: string]: Action } = {
  spawn,
  damage,
}

export const useAction = () => {
  const runActions = (actions: CardsCollectionItem['interactions'][0]['actions'], baseCard: BoardCard, interactingCart: BoardCard) => {
    actions.forEach((action) => {
      if (!allActions[action.type]) {
        console.error(`Action '${action.type}' not found!`)
        return
      }

      allActions[action.type](action, baseCard, interactingCart)
    })
  }

  return {
    runActions,
  }
}
