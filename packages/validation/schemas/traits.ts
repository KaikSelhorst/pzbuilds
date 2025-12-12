import { z } from '../zod'

export const createTraitSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  cost: z.number().max(9999),
  incompatibleWith: z.array(z.uuidv7()).default([]),
})

export type CreateModTraitSchema = z.infer<typeof createTraitSchema>

export const createModTraitParamsSchema = z.object({
  modId: z.uuidv7(),
})

export type CreateModTraitParamsSchema = z.infer<
  typeof createModTraitParamsSchema
>

export const updateTraitSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  cost: z.number().max(9999).optional(),
  incompatibleWith: z.array(z.uuidv7()).default([]).optional(),
})

export type UpdateModTraitSchema = z.infer<typeof updateTraitSchema>
