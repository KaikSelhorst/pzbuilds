import z from 'zod'
import { limit, offset } from './filters'

export const createModSchema = z.object({
  modId: z
    .string({ error: 'modId is required' })
    .length(10, { error: 'modId must be exactly 10 characters long' }),
})

export type CreateModSchema = z.infer<typeof createModSchema>

export const updateModSchema = z.object({
  name: z
    .string({ error: 'name is required' })
    .min(2, { error: 'name must be at least 2 characters long' }),
})

export type UpdateModSchema = z.infer<typeof updateModSchema>

export const updateModParamsSchema = z.object({
  modId: z.uuidv7({ error: 'id is required' }),
})

export const getModsFilterSchema = z.object({
  limit: limit(25, 100, 25),
  offset: offset(0, 0),
})

export type GetModsFilterSchema = z.infer<typeof getModsFilterSchema>
