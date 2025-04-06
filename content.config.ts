import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cards: defineCollection({
      type: 'data',
      source: 'cards/**/*.json',
      schema: z.object({
        label: z.string(),
        icon: z.string().default('material-symbols:man-rounded'),
        health: z.number().gte(0).lte(20).optional(),
        type: z.enum(['person', 'resource', 'building', 'merchant', 'enemy']),
      }),
    }),
  },
})
