import { z } from '../zod'

export const createTraitSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  cost: z.number().max(9999),
  incompatibleWith: z.array(z.uuidv7()).default([]),
  modId: z.uuidv7(),
})

export type CreateTraitSchema = z.infer<typeof createTraitSchema>

export const updateTraitSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  cost: z.number().max(9999).optional(),
  incompatibleWith: z.array(z.uuidv7()).default([]).optional(),
  modId: z.uuidv7().optional(),
})

export type UpdateTraitSchema = z.infer<typeof updateTraitSchema>
