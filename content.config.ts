import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const actionsType = z.array(z.object({
  type: z.string(),
  card: z.string().optional(),
  amount: z.number().optional(),
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
        iconColor: z.string().optional().default('#000000'),
        health: z.number().gte(0).lte(20).optional(),
        amount: z.number().gte(0).optional(),
        type: z.enum(['person', 'resource', 'building', 'merchant', 'enemy', 'event']),
        strength: z.number().gte(0).optional(),
        interactions: z.array(z.object({
          card: z.string(),
          consume: z.boolean().default(false),
          amount: z.number().gte(0).optional(),
          actions: actionsType,
          time: z.number().positive().default(0),
          infinite: z.boolean().default(false),
          showHealthInsteadOfTime: z.boolean().default(false),
        })),
        onDeath: actionsType,
      }),
    }),
  },
})
