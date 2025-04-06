import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cards: defineCollection({
      type: 'data',
      source: 'cards/**/*.json',
      schema: z.object({
        identifier: z.string(),
        label: z.string(),
        icon: z.string().default('material-symbols:man-rounded'),
        health: z.number().gte(0).lte(20).optional(),
        type: z.enum(['person', 'resource', 'building', 'merchant', 'enemy']),
        interactions: z.array(z.object({
          cards: z.array(z.object({
            identifier: z.string(),
            amount: z.number().gte(0).default(1),
          })),
          actions: z.array(z.object({
            type: z.enum(['spawn', 'damage']),
            card: z.string().optional(),
            amount: z.number().optional(),
          })),
          time: z.number().positive().default(0),
        })),
      }),
    }),
  },
})
