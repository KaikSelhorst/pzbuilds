import { pgEnum } from 'drizzle-orm/pg-core'

export const TraitTypeEnum = ['POSITIVE', 'NEGATIVE'] as const

export type TraitTypeEnumInterface = (typeof TraitTypeEnum)[number]

export const traitTypeEnum = pgEnum('type', TraitTypeEnum)
