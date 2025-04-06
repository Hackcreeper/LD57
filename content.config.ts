import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const amountType = z.union([
  z.number().gte(0),
  z.object({
    min: z.number().gte(0),
    max: z.number().gte(1),
  }),
])

const actionsType = z.array(z.object({
  type: z.enum(['spawn', 'damage']),
  card: z.string().optional(),
  amount: amountType.optional(),
}))

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
        amount: z.number().gte(0).optional(),
        type: z.enum(['person', 'resource', 'building', 'merchant', 'enemy']),
        interactions: z.array(z.object({
          card: z.string(),
          consume: z.boolean().default(false),
          amount: z.number().gte(0).optional(),
          actions: actionsType,
          time: z.number().positive().default(0),
        })),
        onDeath: actionsType,
      }),
    }),
  },
})
