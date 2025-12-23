import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { traitTypeEnum } from '../enums'
import { createdAt, id, updatedAt } from '../utils/schemas-types'
import { mods } from './mods'

export const traits = pgTable('traits', {
  id,
  name: text('name').notNull(),
  description: text('description').notNull(),
  cost: integer('cost').notNull(),
  type: text({ enum: traitTypeEnum }).notNull(),
  incompatibleWith: uuid('tags').array().notNull().default([]),
  modId: uuid('mod_id')
    .notNull()
    .references(() => mods.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export type TraitsInterface = typeof traits.$inferSelect
