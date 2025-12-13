import { z } from '../zod'

const cost = z.coerce.number<number>().max(9999)

export const createTraitSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  cost: cost,
  incompatibleWith: z.uuidv7().array().optional().default([]),
})

export type CreateTraitSchema = z.infer<typeof createTraitSchema>

export const createTraitParamsSchema = z.object({
  modId: z.uuidv7(),
})

export type CreateTraitParamsSchema = z.infer<typeof createTraitParamsSchema>

export const updateTraitSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  cost: cost.optional(),
  incompatibleWith: z.uuidv7().array().optional(),
})

export type UpdateTraitSchema = z.infer<typeof updateTraitSchema>

export const getTraitsParamsSchema = z.object({
  modId: z.uuidv7(),
})

export type GetTraitsParamsSchema = z.infer<typeof getTraitsParamsSchema>
