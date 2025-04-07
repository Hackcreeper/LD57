import type { EventsCollectionItem } from '@nuxt/content'

export type JourneyEvent = {
  uniqueId: string
  event: EventsCollectionItem
  progress: number
  revealed: boolean
  executed: boolean
}
