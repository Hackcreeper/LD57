import type { JourneyEvent } from '~/types/JourneyEvent'

export const useProgressStore = defineStore('progress', () => {
  const eventStore = useEventStore()

  const amountOfEvents = 12
  const events = ref<JourneyEvent[]>([])
  const progress = ref(0)

  const init = async () => {
    for (let i = 0; i < amountOfEvents - 1; i++) {
      events.value.push({
        uniqueId: crypto.randomUUID(), // We iterate through each card, so we need something unique for Vue
        event: eventStore.getRandomEvent(),
        progress: 100 / amountOfEvents * (i + 1),
        revealed: false,
      })
    }

    const winEvent = eventStore.getEventByIdentifier('win')
    assert(winEvent !== undefined, 'Win event not found!')
    events.value.push({
      uniqueId: crypto.randomUUID(), // We iterate through each card, so we need something unique for Vue
      event: winEvent,
      progress: 100,
      revealed: true,
    })
  }

  const advance = (amount: number) => {
    progress.value += amount
    // TODO: Handle events
  }

  return {
    init,
    events,
    progress,
    advance,
  }
})
