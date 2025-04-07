import type { EventsCollectionItem } from '@nuxt/content'

export const useEventStore = defineStore('event', () => {
  const events = ref<EventsCollectionItem[]>([])

  const init = async () => {
    const { data } = await useAsyncData('events', () => {
      return queryCollection('events').all()
    })

    events.value = data.value ?? []
  }

  const getRandomEvent = (): EventsCollectionItem => {
    const filtered = events.value.filter(e => !e.hidden)

    return filtered[Math.floor(Math.random() * filtered.length)]
  }

  const getEventByIdentifier = (identifier: string): EventsCollectionItem | undefined => {
    return events.value.find(e => e.identifier === identifier)
  }

  return {
    init,
    getRandomEvent,
    getEventByIdentifier,
  }
})
