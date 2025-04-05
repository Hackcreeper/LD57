import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cards: defineCollection({
      type: 'data',
      source: 'cards/**/*.json',
      schema: z.object({
        label: z.string(),
        icon: z.string().default('material-symbols:man-rounded'),
      }),
    }),
  },
})
