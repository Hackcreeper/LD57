import type { CardsCollectionItem } from '@nuxt/content'
import { spawn } from './actions/spawn'
import { damage } from './actions/damage'
import { hit } from './actions/hit'
import { replace } from './actions/replace'
import { combine } from './actions/combine'
import { fight } from './actions/fight'
import { trade } from './actions/trade'
import { destroy } from './actions/destroy'
import type { BoardCard } from '~/types/Board'
import type { Action } from '~/types/Action'

const allActions: { [key: string]: Action } = {
  spawn,
  damage,
  hit,
  replace,
  combine,
  fight,
  trade,
  destroy,
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
