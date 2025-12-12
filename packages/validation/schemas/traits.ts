import { z } from '../zod'

export const createTraitSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  cost: z.number().max(9999),
  incompatibleWith: z.array(z.uuidv7()).default([]),
})

export type CreateTraitSchema = z.infer<typeof createTraitSchema>

export const createTraitParamsSchema = z.object({
  modId: z.uuidv7(),
})

export type CreateTraitParamsSchema = z.infer<typeof createTraitParamsSchema>

export const updateTraitSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  cost: z.number().max(9999).optional(),
  incompatibleWith: z.array(z.uuidv7()).default([]).optional(),
})

export type UpdateTraitSchema = z.infer<typeof updateTraitSchema>

export const getTraitsParamsSchema = z.object({
  modId: z.uuidv7(),
})

export type GetTraitsParamsSchema = z.infer<typeof getTraitsParamsSchema>
