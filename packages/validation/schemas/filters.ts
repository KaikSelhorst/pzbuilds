import { z } from '../zod'

export const offset = (min = 0, defaultValue = 0) => {
  return z
    .string()
    .transform((value) => {
      const parsed = Number(value)
      if (Number.isNaN(parsed)) return defaultValue
      if (parsed < min) return min
      return parsed
    })
    .refine((value) => value >= min)
    .optional()
    .default(defaultValue)
}

export const limit = (min = 25, max = 100, defaultValue = 25) => {
  return z
    .string()
    .transform((value) => {
      const parsed = Number(value)
      if (Number.isNaN(parsed)) return defaultValue
      if (parsed < min) return min
      if (parsed > max) return max
      return parsed
    })
    .refine((value) => value >= min && value <= max)
    .optional()
    .default(defaultValue)
}
