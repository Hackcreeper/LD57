import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const amountType = z.union([
  z.number().gte(0),
  z.object({
    min: z.number().gte(0),
    max: z.number().gte(1),
  }),
])

const actionsType = z.array(z.object({
  type: z.string(),
  card: z.string().optional(),
  amount: amountType.optional(),
  actions: z.array(z.object({
    type: z.string(),
    card: z.string().optional(),
    amount: amountType.optional(),
  })).optional(),
}))

export default defineContentConfig({
  collections: {
    cards: defineCollection({
      type: 'data',
      source: 'cards/**/*.json',
      schema: z.object({
        identifier: z.string(),
        extend: z.string().optional(),
        label: z.string(),
        icon: z.string().default('material-symbols:man-rounded'),
        iconColor: z.string().optional().default('#000000'),
        health: z.number().gte(0).lte(20).optional(),
        amount: z.number().gte(0).optional(),
        type: z.enum(['person', 'resource', 'building', 'merchant', 'enemy', 'event', 'limitedUsage', 'static']),
        strength: z.number().gte(0).optional(),
        buyable: z.boolean().default(false),
        buyableMaxAmount: z.number().gte(1).default(1),
        price: z.number().gt(0).optional(),
        container: z.string().optional(),
        containerMax: z.number().gt(1).optional(),
        cooldown: z.number().gte(0).optional(),
        interactions: z.array(z.object({
          card: z.string(),
          consume: z.boolean().default(false),
          amount: z.number().gte(0).optional(),
          actions: actionsType,
          time: z.number().positive().default(0),
          infinite: z.boolean().default(false),
          showHealthInsteadOfTime: z.boolean().default(false),
          consumeContainer: z.boolean().default(false),
        })),
        onDeath: actionsType,
        onSpawn: actionsType,
        timer: z.object({
          time: z.number().positive().default(0),
          actions: actionsType,
        }).optional(),
      }),
    }),
    events: defineCollection({
      type: 'data',
      source: 'events/**/*.json',
      schema: z.object({
        identifier: z.string(),
        icon: z.string().default('material-symbols:man-rounded'),
        type: z.enum(['positive', 'negative', 'neutral']),
        hidden: z.boolean().default(false),
        actions: actionsType,
      }),
    }),
  },
})
