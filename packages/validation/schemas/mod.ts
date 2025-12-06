import z from 'zod'

export const createModSchema = z.object({
  modId: z
    .string({ error: 'modId is required' })
    .length(10, { error: 'modId must be exactly 10 characters long' }),
})

export type CreateModSchema = z.infer<typeof createModSchema>
